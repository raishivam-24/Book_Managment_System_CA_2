const express=require('express')
const router=express.Router();
const Book=require('../model/bookModel');
const books=[]
const bookid=1


router.get("/api/books",async(req,res)=>{
    try{
        const page=parseInt(req.query.page,10)||1
        const limit=parseInt(req.query.limit,10)||10
        const {books,totalBooks}=await Promise.all([
            Book.find().populate("title author category").skip(page).limit(limit),
            Book.countDocument()
        ])
        const totalPage=Math.ceil(totalBooks/limit)
        res.status().json({
            message:success,
            metadata:{
                totalPage,
                totalBooks,
                currentPage:page,
            },
            data:books,
        })
    }catch(error){
        res.status(500).json({message:"Error fetching books",error})
    }
});


router.post("/api/book",async(req,res)=>{
try{
    const {title,author,category}=req.body;
    if(!title||title.trim()==="")
        return res.status(404).json({message:"Title is missing"})
    const newbook={
        id:bookid++,
        title:title.trim(),
        author:author.trim(),
        category:category.trim()
    }
const createBook=await Book.create(newbook)
books.push(createBook)
res.status(200).json(createBook)
}catch(error){
    res.status(500).json({message:"Error creating book",error})
}
});

router.patch("/api/book/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
        if(!id) res.status(404).json({message:"book doesn't exist"})
        const {availability}=req.body
        const book=await Book.findByIdAndUpdate(id,{availability},{new:true})
        if(!book) return res.status(404).json({message:"book doesn't exist"})
        res.status(200).json(book)      
    }
    catch(error){
        res.status(500).json({message:"Error updating book",error})
    }
});

module.export=router()