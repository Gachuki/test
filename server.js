const express = require('express');
const app = express();
const mongo = require('mongoDB');
const url = 'mongodb://localhost:27017/';



app.get('/home',(req,res)=>{
    res.sendFile(__dirname+'/'+'index.html')
})
app.get('/regform',(req,res)=>{
    res.sendFile(__dirname+'/'+'register.html')
})

app.get('/register',(req,res)=>{
    Response={
        fname:req.query.firstname,
        lname:req.query.lastname,
        email:req.query.email,
        username:req.query.username,
        pwsd:req.query.password,
    }
    mongo.connect(url,{ useUnifiedTopology: true }, (err,db)=>{
        let dbo= db.db('saturday');
        let table=dbo.collection('users');
        table.insertOne(Response,(err,result)=>{
            if(err){
                console.log(err);
                process.exit(0);
            }else{
                console.log("Db connected successfully");
            }
            db.close();
        })
        
    });
    
    
});

//log in
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/'+'workspace.html')
})
app.get('/view',(req,res)=>{
    mongo.connect(url,{ useUnifiedTopology: true }, (err,db)=>{
        let dbo= db.db('saturday');
        let table=dbo.collection('users');
        table.find().toArray((err,result)=>{
            if(err){
                console.log(err);
                process.exit(0);
            }else{
               res.send(result)
            }
            db.close();
        })
        
    });
    
    
});
//log in
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/'+'workspace.html')
})
app.get('/view',(req,res)=>{
    mongo.connect(url,{ useUnifiedTopology: true }, (err,db)=>{
        let dbo= db.db('saturday');
        let table=dbo.collection('users');
        table.find().toArray((err,result)=>{
            if(err){
                console.log(err);
                process.exit(0);
            }else{
               res.send(result)
            }
            db.close();
        })
        
    });
    
});
// //delete
// app.get('/delete',(req,res)=>{
//     res.sendFile(__dirname+'/'+'delete.html')
// })
app.get('/delete',(req,res)=>{
    let uname=req.query.username;
    mongo.connect(url,{ useUnifiedTopology: true }, (err,db)=>{
        if(err){
            console.log(err);
            process.exit(0);
        }
      
            let dbo = db.db('saturday');
            console.log("Db connected successfully");
            let colle = dbo.collection('users');
            colle.deleteMany({username:uname}),(err,result)=>{
                if(err){
                    console.log(err);
                    process.exit(0);
                }
                console.log(result);
                db.close();
                
            };
    });
});
app.get('/update',(req,res)=>{
    let oldusure=req.query.oldname;
    let newuser=req.query.newname;
    mongo.connect(url,{ useUnifiedTopology: true }, (err,db)=>{
        if(err){
            console.log(err);
            process.exit(0);
        }
      
            let dbo = db.db('saturday');
            console.log("Db connected successfully");
            let colle = dbo.collection('users');
            colle.updateOne({username:oldusure},{'$set':{'username':newuser}}),(err,result)=>{
                if(err){
                    console.log(err);
                    process.exit(0);
                }
                console.log(result);
                db.close();
                
            };
    });
});



app.listen(3000,()=>console.log('server started @3000'));
