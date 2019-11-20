const express = require('express');
//const User = require('../models/user');
const User = require('../models/users');
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail, sendCancellationEmail}=require('../emails/accounts');
const router = new express.Router();
const upload = new multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg)$/)){
           return cb(new Error('Upload the valid file'))
        }
        cb(undefined, true);
    }
})

router.post('/users',async (req, res)=>{
    const user = User(req.body);
    
       
       try{
       
        await user.save();
        sendWelcomeEmail(user.email,user.name);

        const token = await user.generateAuthToken();
       // console.log(user);
        res.status(201).send({user,token});
       } catch(e){
          // console.log(e);
           res.status(400).send(e);
       }
    })



    router.get('/users/me', auth ,async (req,res)=>{

        res.send(req.user);
   
        // try{
        //     const user = await User.find({});
        //      res.status(201).send(user);
        // }catch(e){
        //         res.status(500).send();
        // }
    
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch((error)=>{
    //     res.status(500).send(error);
    // })
    })
    router.post('/users/logout', auth , async (req,res)=>{
        try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token;
        })
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(400).send();
    }

    })

    router.post('/users/logoutall', auth , async (req,res)=>{
        try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
        }catch(e){
             res.status(400).send();
        }
    })

    router.get('/users/:id', async (req,res)=>{

        const _id = req.params.id;
             try{
                 const user = await User.findById(_id);
                 if(!user){
                 throw new Error("User not exist");
                 }
     
                 res.status(201).send(user);
     
             }catch(e){
                 res.status(500).send();
             }
         // const _id = req.params.id;
         // User.findById(_id).then((user)=>{
         //     if(user==undefined){
         //            return res.status(500).send();
         //     }
     
     
         //     res.send(user);
         // }).catch((error)=>{
         //         res.status(404).send();
         // })
     })

     router.patch('/users/me',auth, async (req,res)=>{
         const updates = Object.keys(req.body);
        // const _id = req.params.id;
        const validUpdates = ['name', 'age','email','password'];
        const valid = updates.every((update)=>{
            return validUpdates.includes(update);
        })
        if(!valid){
           return res.status(400).send({error:'Invalid updates'});
        }
        try{
            // const user = await User.findByIdAndUpdate(_id , req.body, {new : true , runValidators : true});4
          //  const user = await User.findById(_id);
              updates.forEach((update)=>{
                  req.user[update]=req.body[update];
              })
               await req.user.save();
                res.send(req.user);
        }catch(e){
                   res.status(400).send({error : 'not working'});
        }
    })
    router.post('/users/login', async (req,res)=>{


        try{
        const user = await User.findByCrendentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken();
        res.send({user ,token});
        }catch(e){
            console.log(e);
            res.status(400).send(e);
        }
        
    })

    router.delete('/users/me',auth , async (req,res)=>{

        try{
           await req.user.remove();
           sendCancellationEmail(req.user.email, req.user.name);

           res.send(req.user);
        }catch(e){
            res.status(500).send();
        }
  })
  

  router.post('/users/me/avatar',auth, upload.single('upload'), async (req,res)=>{
    //    req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({width: 250 , height : 250}).png().toBuffer();
    req.user.avatar= buffer;
        await req.user.save();
      res.send();
  },(error , req, res, next)=>{
      res.status(400).send({error: error.message});
  })

  router.delete('/users/me/avatar',auth , async (req,res)=>{
        req.user.avatar=undefined;
        await req.user.save();
        res.send();
  })

  router.get('/users/:id/avatar', async (req,res)=>{
      try{
          
          const user = await User.findById(req.params.id);
          if(!user || !user.avatar){
              throw new Error();
          }
          res.set('Content-Type','image/png');
          res.send(user.avatar);

      }catch(e){
          res.status(400).send();
      }
  })


module.exports =  router;