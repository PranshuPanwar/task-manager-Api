const express = require('express');
require('./db/mongoose');

//console.log(User);

const app= express();
const userrouter = require('./routers/users');
const taskrouter = require('./routers/tasks');

// app.use((req,res,next)=>{
//     if(req.method ==='GET'){
//         res.send('Get request cannot be entertained');
//         }
//         else{
//             next();
//         }
// })
// app.use((req,res,next)=>{
//      res.send('Website Under maintainence , Sorry for inconvience');
// })

app.use(express.json());
app.use(taskrouter);

app.use(userrouter);

// const multer = require('multer');
// const upload = multer({
//     dest : 'images',
//     limits :{
//         fileSize:1000000
//     },
//     fileFilter(req, file, cb){
//            if(!file.originalname.match(/\.(doc|docx)$/)){
//              return  cb(new Error('Upload the doc file'))
//            }

//            cb(undefined, true);
//     }
// });

// app.post('/uploads', upload.single('upload'), (req,res)=>{
//     res.send();
// },(error, req, res ,next)=>{
//     res.status(400).send({error:error.message});
// })


const port = process.env.PORT;

app.listen(port ,()=>{
    console.log("Server is running at :"+port );
})

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const myFunc = async ()=>{
//     const token = await jwt.sign({_id:'123abc'},'thisismytoken',{expiresIn:'2 minute'});
//        const data= await  jwt.verify(token,'thisismytoken');
//           console.log(token);
// }

// const myFunc = async ()=>{
//     const password = "Red1244!";
//     const hashpassword =  await bcrypt.hash(password, 8);

//   //  console.log(password);
//     console.log(hashpassword);
//     const isMatch = await bcrypt.compare('Red1244!',hashpassword);
//     console.log(isMatch);

// }

//  myFunc();
// const pet = {
//     name :'Pranshu'
// }

// pet.toJSON = function(){
//       // console.log(this);
//        return {};
// }

// console.log(JSON.stringify(pet));

const Task =require('./models/task');
const User = require('./models/users');

const main = async ()=>{
    const user = await User.findById('5db81668f9d9b9192478b635');
    await user.populate('task').execPopulate();
       console.log(user.task);

}
