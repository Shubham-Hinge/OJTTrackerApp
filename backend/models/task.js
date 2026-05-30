const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title:String,

  category:String,

  priority:String,

  dueDate:String,

  completed:{
    type:Boolean,
    default:false
  }

},{timestamps:true});

module.exports =
mongoose.model("Task",taskSchema);