
// const {MongoClient , ObjectID}= require('mongodb');
// const connectionURL = "mongodb://127.0.0.1/27017";
// const databasename = 'task-manager';
// // const id = new ObjectID();
// // console.log(id.id.length);
// // // 12 byte id first  4 for the timestamp , next 5 random , next 3 for the counter
// // console.log(id.toHexString().length);
// // the object id are the globals uses for getting the queries

// MongoClient.connect(connectionURL, {useNewUrlParser:true},(error ,client)=>{
//     if(error){
//        return console.log('Not able to connect the database');
//     }

// const db = client.db(databasename);
// db.collection('Users').findOne({_id : new ObjectID("5d9a43101c4d002a383b415e")},(error,user)=>{

// if(error){
//   return  console.log('Unable to find the data');
// }

//     console.log(user);
// })

// db.collection('Users').find({age : 27}).toArray((error,user)=>{

//     console.log(user);
// })

// db.collection('tasks').findOne({_id :new ObjectID("5d9985e7755fce13b835330b")},(error , user)=>{

//     if(error){
//         return console.log("Unable to connect to database");
//     }

//     console.log(user);
// })

// db.collection('tasks').find({completed :true}).toArray((error,user)=>{
//     console.log(user);
// })

// db.collection('tasks').find({completed:true}).count((error, user)=>{
//     if(error){
//         return console.log(error);
//     }
//     console.log(user);
// })


// update function need to work now 
//const db = client.db(databasename);
// const updatepromise =db.collection('Users').updateOne({
//     _id : new ObjectID("5d9984d7c34481193c27c969")
// },{
//     $inc :{
//         age: 1
//     }
// });

// updatepromise.then((result)=>{
//     console.log(result);
//     console.log("success");
// }).catch((error)=>{
//     console.log(error);
// })

// db.collection('tasks').updateMany({
//     completed : true
// },{
//     $set :{
//         completed :false
//     }
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
//  db.collection('Users').deleteMany({
//      age:42
//  }).then((result)=>{
//      console.log(result);
//  }).catch((error)=>{
//      console.log(error);
//  })


//  db.collection('tasks').deleteOne({
//       task : 'Task1'
// }).then((result)=>{
//      console.log(result);
//  }).catch((error)=>{
//      console.log(error);
//  })

// })