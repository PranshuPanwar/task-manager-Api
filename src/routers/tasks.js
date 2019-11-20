const express = require('express');
const Task  = require('../models/task');
const auth= require('../middlewares/auth');
const router = new express.Router();




router.get('/tasks', auth,async (req,res)=>{
                      const match ={};
                      const sort ={}
         if(req.query.completed){
             match.completed = req.query.completed==='true';

         }
         if(req.query.sortby){
             const parts= req.query.sortby.split(':');
             sort[parts[0]]=parts[1]==='asc'?1:-1;
         }
    try{
        await req.user.populate({
            path :'task',
            match,
            options :{
                limit : parseInt(req.query.limits),
                skip  : parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.task);
    }catch(e){
        res.status(400).send(error);
    }
//  Task.find({}).then((task)=>{
//      res.send(task);
//  }).catch((error)=>{
//      res.status(400).send(error);
//  })
})


router.get('/tasks/:id',auth, async (req,res)=>{
const _id = req.params.id;
try{
     const task = await Task.findOne({_id, 'owner':req.user._id});

     if(!task){
       //  throw new Error('task not found')
      return  res.status(400).send('task not found');
     }
     res.send(task);
     }catch(e){
         res.status(500).send(e);
     }
// console.log(req.params.id);
// const _id = req.params.id;
//  Task.findById(_id).then((task)=>{
//      if(task==undefined){
//          return res.status(500).send();
//      }

//      res.send(task);
//  }).catch((error)=>{
//      res.status(400).send(error);
//  })
})
router.post('/tasks',auth,async (req,res)=>{
  //  const task1 = req.body;
const task =  new Task(
    req.body
)
task.owner = req.user._id;
try{
     await task.save();
     res.send(task);
}catch(e){
    res.status(400).send(error);
}
// const task=new Task(req.body);

// task.save().then(()=>{
//     res.status(201).send(task);
// }).catch((error)=>{
//     res.status(400).send(error);
// })

})




router.patch('/tasks/:id',auth, async (req ,res)=>{
 const updates = Object.keys(req.body);
  const _id = req.params.id;
   const validUpdates = ['description', 'completed'];
   const valid = updates.every((update)=>{
       return validUpdates.includes(update);
   })
   if(!valid){
       return res.status(404).send({error : 'please update valid fields'});
   }
   try{
     //  const task = await Task.findByIdAndUpdate(_id,req.body ,{new :true , runValidators:true});
     const task = await Task.findById({_id , owner : req.user._id});
       
         if(!task){
             return res.status(404).send();
         }
         updates.forEach((update)=>{
            task[update]=req.body[update];
        })
        await task.save();
         res.send(task);
   }catch(e){
       res.status(500).send(e);
   }
})



router.delete('/tasks/:id',auth, async (req,res)=>{
const _id = req.params.id;
try{
    const task = await Task.findOneAndRemove({_id, owner:req.user._id});
    if(!task){
        return res.status(404).send();
    }
    res.send(task);
}catch(e){
    console.log(e);
    res.status(400).send(e);
}
})





module.exports = router;