const mongoose = require('mongoose');
main()
    .then(()=>
        {console.log("connection successful")})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const Chat = require("./models/chat.js");

let allChats=[
    {
    from:"thanos",
    to:"tony",
    message:"You are not the only one cursed with knowledge",
    created_at: new Date()
    },
    {
    from:"ben",
    to:"peter",
    message:"with great power comes great responsibility",
    created_at: new Date()
    },
    {
    from:"tony",
    to:"thanos",
    message:"i am iron man",
    created_at: new Date()
    }
];

Chat.insertMany(allChats);