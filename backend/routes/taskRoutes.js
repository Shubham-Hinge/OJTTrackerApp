const express = require("express");
const Task = require("../models/task");

const router = express.Router();

/* GET ALL TASKS */

router.get(
  "/",
  async(req,res)=>{

    try{

      const tasks =
      await Task.find();

      res.json(tasks);

    }catch(err){

      res.status(500).json({
        msg:err.message
      });

    }

});

/* ADD TASK */

router.post(
  "/",
  async(req,res)=>{

    try{

      const task =
      await Task.create({

        title:req.body.title,

        category:req.body.category,

        priority:req.body.priority,

        dueDate:req.body.dueDate

      });

      res.status(201).json(task);

    }catch(err){

      res.status(500).json({
        msg:err.message
      });

    }

});

/* UPDATE TASK */

router.put(
  "/:id",
  async(req,res)=>{

    try{

      const task =
      await Task.findByIdAndUpdate(

        req.params.id,

        req.body,

        {new:true}

      );

      res.json(task);

    }catch(err){

      res.status(500).json({
        msg:err.message
      });

    }

});

/* DELETE TASK */

router.delete(
  "/:id",
  async(req,res)=>{

    try{

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        msg:"Task Deleted"
      });

    }catch(err){

      res.status(500).json({
        msg:err.message
      });

    }

});

module.exports = router;