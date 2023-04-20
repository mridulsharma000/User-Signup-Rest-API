const express= require('express');
const router= express.Router();
const Student= require('../model/studentModel');


const mongoose = require('mongoose');


router.get('/',(req,res,next)=>{
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData: result
        });
    })
    .catch(err=>{
        console.log(500).json({
            error:err
        })
    });
})

//Get data by id 

router.get('/:id',  (req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req,res,next)=>{
    const student= new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent: result
        })
    })

    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//delete request
router.delete('/:id', (req,res,next)=>{
    Student.findByIdAndRemove({_id:req.params.id})

    .then(result=>{
        res.status(200).json({
            message: "student deleted successfully",
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


//update or PUT request

router.put('/:id', (req,res,next)=>{
   console.log(req.params.id);
   Student.findOneAndUpdate({_id:req.params.id},{
    $set:{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    }
   })

   .then(result=>{
    res.status(200).json({
        updatedStudent:result
    })
   })

   .catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
   })
})
module.exports= router;
