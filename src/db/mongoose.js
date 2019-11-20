const mongoose = require('mongoose');
//const validator = require('validator');

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser :true,
    useCreateIndex : true,
    useFindAndModify : false
});

// const User = mongoose.model('User',{
//     name :{
//         type : String,
//         required : true,
//         trim: true,
//         tolower :true
//     },
//     email :{
//         type : String,
//         required :true,
//         trim :true,
//         tolower : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Please provide the valid email');
//             }
//         }
//     },
//     password : {
//         type : String,
//         required : true,
//         trim : true,
//         minlength : 6,
//         validate(value){
           
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password cannot contain password');
//             }
//         }
//     },
//     age :{
//         type : Number,
//         default : 0,
//         validate(value){
//             if(value<0){
//                 throw new Error('the Age cannot be negative ');
//             }
            
//         }
//     }
// })

// const me = new User({
//     name : "    Mike",
//     email:'        2334@gmail.com',
//     password : '1231s43RPASSWord'

    
// })


// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log(error);
// })
// const task = mongoose.model('tasks',{
//      description :{
//          type : String,
//          trim :true,        
//          required :true,
//       //   tolower : truedasasdsasadsad
//       },
//      completed :{
//          type : Boolean,
//          default:false
//      }
// })

// const me2 = new task({
//     description :"   CLEAN THE CODE        ",
//    // completed : true
// })

// me2.save().then(()=>{
//     console.log(me2);
// }).catch((error)=>{
//     console.log(error);
// })