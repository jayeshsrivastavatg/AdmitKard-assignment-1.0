const mongoose =require('mongoose')

const questionSchema = new mongoose.Schema({
        Question:{
            type:String,
            required:true,
           autoindex:false
        },
        Topic:{
            type:String,
            required:true
        },
        Tags:{
            type:[String],
            required:true,
            autoindex: false
        }
})
questionSchema.index({Question:'text',Tags: 'text'});
const question= mongoose.model('question',questionSchema)
module.exports = question
