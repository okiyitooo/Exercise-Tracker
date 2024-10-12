const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config({path:'./sample.env'})
const mongoose = require ('mongoose')
const { json } = require('body-parser')
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true })

let User
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: {type: String, required: true}
  })
User = mongoose.model("User", UserSchema)
const TaskSchema = new Schema({
  user_id: { type: String, required: true },
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: Date,
})
const Task = mongoose.model("Task", TaskSchema)
app.use(cors())
app.use(express.static('public'))
app.use((req,res,next)=>{
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})
app.use(bodyParser.urlencoded({   
  extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users",async (req, res) => {
  const userName = req.body.username
  try {
    const newUser = new User({username: userName})
    await newUser.save()
    res.json({ username: newUser.username, _id: newUser._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
app.get("/api/users", async (req,res) => {
  try {
    const users = await User.find({}, { username: 1, _id: 1 })
    res.json(users)
  } catch(err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post("/api/users/:id/exercises",async(req,res)=>{
  const user_id = req.params.id
  const {description, duration, date} = req.body
  try{
    const user = await User.findById(user_id)
    if (!user) return res.status(404).json({ error: 'User not found'})
    const newTask = new Task({
      user_id: user_id,
      description: description,
      duration: duration,
      date: date? new Date(date) : new Date()
    })
    await newTask.save()
    res.json({
      _id: user._id, // Include user's _id
      username: user.username,
      date: newTask.date.toDateString(),   

      duration: newTask.duration,
      description: newTask.description
    })
  }
  catch(err){
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
app.get("/api/users/:id/logs", async (req,res) =>{
  const user_id = req.params.id
  const {from, to, limit} = req.query
  try {
    const user = await User.findById(user_id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    let query = {user_id: user_id}
    if (from || to){
      query.date={}
      if (from) query.date.$gte = new Date(from)
      if (to) query.date.$lte = new Date(to)
    }
    let tasks = await Task.find(query,{description:1, duration:1, date: 1})
    if (limit) {
      tasks = tasks.slice(0,limit)
    }
    tasks = tasks.map(task => ({
      description: task.description,
      duration: task.duration,
      date: task.date.toDateString()
    }));
    res.json({
      username: user.username,
      count: tasks.length,
      log: tasks
    })
  } catch (err) {
    console.error(err)
    res.status(505).json({ error: 'Server error' })
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
