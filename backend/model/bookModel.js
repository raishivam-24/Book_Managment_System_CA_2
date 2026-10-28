const mongoose=require('mongoose')
const bookSchema=mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    author:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    availability:{
        required:true,
        type:Boolean,
        default:true
    },
    createdDate:{
        required:true,
        type:Date,
        default:Date.now
    }
},{timestamps:true})
const Book=mongoose.model("Book",bookSchema)
module.exports=Book;