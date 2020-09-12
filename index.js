const express = require('express')
const hbs=require('hbs')
const mongoose= require('mongoose')
const question = require('./question')
const app=express()
app.set('view engine','hbs')
//Db config
const db= require('./keys').MongoURI
//connect to mongo
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log('mongodb connected...'))
.catch(error=>console.log(error)
)

//EJS
//app.use(expressLayouts


//body parser
app.use(express.urlencoded({extended:false}))


 

 

  app.get('/',(req,res) => {
    console.log("Here")
  res.sendFile(__dirname+'/public/index.html')
  })
  app.get('/add',(req,res) => {
    console.log("Here")
  res.sendFile(__dirname+'/public/add.html')
  })
  app.get('/search',(req,res) => {
    console.log("Here")
  res.sendFile(__dirname+'/public/search.html')
  })

  app.post('/add', async(req,res)=>{
    var {Question,Topic,Tags}=req.body
     Tags=Tags.toLowerCase().split(',')
    const newquestion = question({
      Question,
      Topic,
      Tags
    })
    const q =await newquestion.save()
    res.sendFile(__dirname+'/public/final.html')
  })
  
  

  app.post('/search',async (req,res)=>{
    var {Search}=req.body
    var data = await question.find();
    var len = data.length
    var a = [len]
    var b = [len]
    for(i=0;i<len;i++)
    {
      a[i] = data[i].Question
      b[i] = 0
    }
   
    console.log("length = " + len)
   console.log("searching the string = "+Search)
   var q1= await question.find({Question:{"$regex": Search,$options:'i'}})
   for(i=0;i<q1.length;i++)
   {
    
     q1[i] = q1[i].Question
     
   }
   for(i=0;i<q1.length;i++) 
   {
     var s=q1[i]
     var p = a.indexOf(s)
    
     b[p] = b[p] + 1
   }
   var str = ""
   var v=Search.toLowerCase().split(' ')
   
   for(i=0;i<v.length;i++)
   {

    var q2= await question.find({'Tags': v[i]})
    for(i=0;i<q2.length;i++)
   {
    
     q2[i] = q2[i].Question
     var p = a.indexOf(q2[i])
     b[p]++
   }
   }
   for (i=0; i < len; i++){
     var max = 0;
     var index = 0;
    for(j=0;j<len;j++)
            {
            if(b[j] > max)
            {
              max = b[j]
              index = j
            }

            }
            if(max > 0)
            {
            str = str + a[index] + "<br>"
            b[index] = 0
            }
            else
            {
            break
            }
          }
          if(str == "")
          str = "no match"
   res.render('last',{
            
   question:str
   
    
})
 
    
  })


const PORT=process.env.PORT ||5000

app.listen(PORT,console.log('server Started on port ',PORT))
