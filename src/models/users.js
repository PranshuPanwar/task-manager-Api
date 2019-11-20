const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const  schema = new mongoose.Schema({
    name :{
        type : String,
        require : true,
        trim : true,
        tolower : true
    },
    email :{
        type : String,
        unique :true,
        require : true,
        trim : true,
        tolower : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please provide valid email ');
            }
        }
    },
    password :{
        type : String,
        require : true,
        trim : true,
        tolower : true,
        minlength : 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password does not contain password');
            }
        }
    },
    age :{
        type : Number,
        default : 0,
        validate(value){
            if(value <0){
                throw new Error("Age cannot be negative");
            }
        }
    },
    tokens :[{
        token :{
            type :String,
            require :true
        }
    }],
    avatar :{
        type : Buffer
    }
},
{
    timestamps :true
});
schema.virtual('task',{
      ref:'task',
      localField :'_id',
      foreignField :'owner'
})
schema.methods.toJSON = function(){
    const user = this;
      const userobject = user.toObject();

    delete userobject.tokens;
    delete userobject.password;
    delete userobject.avatar;

    return userobject;
}

schema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id.toString()}, process.env.JWT_SECRET);
     user.tokens = await user.tokens.concat({token});
     await user.save();

    return token;

}

schema.statics.findByCrendentials = async (email, password)=>{
        const user = await User.findOne({email});
            if(!user){
                throw new Error('Unable to login');
            }
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch){
                throw new Error('Unable to login');
            }
            return user;
}

//need to start the middlewares
schema.pre('save', async function(next){
    const user = this;
   //  console.log('working');
     if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8);
     }
    next();
})
// need to remove the tasks
schema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({owner :user._id});
    next();
})
const User = mongoose.model('User',schema);


module.exports = User;