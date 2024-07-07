const express=require("express");
const app=express();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

const Chat = require("./models/chat.js");

const mongoose = require('mongoose');
//------------------------------------------------------------
main()
    .then(()=>
        {console.log("connection successful")})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//-------------------------------------------------------------
app.get("/",(req,res)=>{
    res.send("root is working");
})
//-------------------------------------------------------------
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
    // console.log(chats);
})
//------------------------------------------------------------
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//-----------------------------------------------------------
app.post("/chats",(req,res)=>{
    let {from:nfrom,to:nto,message:nmsg} = req.body;
    let newChat=new Chat({
        from:nfrom,
        to:nto,
        message:nmsg,
        created_at:new Date()
    });
    // console.log(newChat);
    newChat.save().then(res=>{console.log("chat was saved");})
    res.redirect("/chats");
})
//----------------------------------------------------------
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
    console.log(id);
    res.render("edit.ejs",{chat});
})
//--------------------------------------------------------
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    console.log(newMsg);
    let updatedChat= await Chat.findByIdAndUpdate(id,{message:newMsg},{new:true});
    console.log(updatedChat);
    res.redirect("/chats");

})
//------------------------------------------------------------
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let dchat = await Chat.findByIdAndDelete(id);
    console.log(dchat);
    res.redirect("/chats");
})
//------------------------------------------------------------
app.listen(8080,()=>{
    console.log("server listening on port 8080");
})
//--------------------------------------------------------------