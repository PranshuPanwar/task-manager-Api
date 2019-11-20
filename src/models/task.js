const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description  :{
        type : String ,
        require : true,
         trim : true
    },
    completed :{
        type : Boolean,
        default : false
    },
    owner :{
            type : mongoose.Schema.Types.ObjectId,
            require : true,
            ref :'User'
    }
},{
    timestamps :true
})

schema.pre('save', async function(next){
    const task = this;
     console.log('task middleware');
     next();
})

const task = mongoose.model('task',schema);



module.exports  = task;