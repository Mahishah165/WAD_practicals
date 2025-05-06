const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//Connect mongo db
mongoose.connect('mongodb://127.0.0.1:27017/W21')
.then(()=>console.log("Mongo Connected"))
.catch(err=>{
    console.error("MongoDb Error Connection",err);
});
//Schema 
const BookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    genre:{type:String,required:true}
});

const Book = mongoose.model('Book', BookSchema);

//api
app.post('/addBook',async(req,res)=>{
    try {
        const {title,author,price,genre} = req.body;
        //validations
        if(!title || !author ||!price ||!genre){
           return res.status(400).json({"Message":"All fields are mandatory"});
        }
        if(typeof price!=='number' || price<0){
            return res.status(400).json({"Message":"Price should be a non-negative number"});
        }
        //make a new book
        const book = new Book({title,author,price,genre});
        await book.save();
        return res.status(200).json({"Message":"Entity added succesfully",book});
        
    } catch (error) {
        res.status(500).json({"Eror":error.message});
    }
})

//api to get all
app.get('/getBook',async(req,res)=>{
    try {
        const book = await Book.find();
        return res.status(200).json({"total":book.length,book});
    } catch (error) {
        return res.status(500).json({"Eror":error.message});
    }
});

//api to delete
app.delete('/delete/:id',async(req,res)=>{
    try {
        const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(500).json({"message":"Invalid ID"});
    }
    const result = await Book.findByIdAndDelete(id);
    if(!result){
        return res.status(404).json({"Message":"Book not found"});
    }
    res.status(200).json({"Message":"Book deleted successfully"});
    } catch (error) {
        return res.status(500).json({"Eror":error.message});
    }
});
//Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});