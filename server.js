const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MSG_FILE = path.join(__dirname, 'messages.json');   // tin nhắn chúc
const LETTER_FILE = path.join(__dirname, 'letters.json'); // thư

// --------- Tin nhắn chúc ----------
app.post('/send', (req, res) => {
    const { name, message } = req.body;
    if(!name || !message) return res.status(400).json({error:'Thiếu tên hoặc nội dung'});

    let messages = [];
    if(fs.existsSync(MSG_FILE)) messages = JSON.parse(fs.readFileSync(MSG_FILE,'utf8'));
    messages.push({name,message});
    fs.writeFileSync(MSG_FILE, JSON.stringify(messages,null,2));
    res.json({status:'ok'});
});

app.get('/messages', (req,res)=>{
    if(!fs.existsSync(MSG_FILE)) return res.json([]);
    const messages = JSON.parse(fs.readFileSync(MSG_FILE,'utf8'));
    res.json(messages);
});

// --------- Thư ----------
app.post('/sendLetter', (req, res) => {
    const { sender, message } = req.body;
    if(!sender || !message) return res.status(400).json({error:'Thiếu tên hoặc nội dung'});

    let letters = [];
    if(fs.existsSync(LETTER_FILE)) letters = JSON.parse(fs.readFileSync(LETTER_FILE,'utf8'));
    letters.push({sender,message});
    fs.writeFileSync(LETTER_FILE, JSON.stringify(letters,null,2));
    res.json({status:'ok'});
});

app.get('/letters', (req,res)=>{
    if(!fs.existsSync(LETTER_FILE)) return res.json([]);
    const letters = JSON.parse(fs.readFileSync(LETTER_FILE,'utf8'));
    res.json(letters);
});

app.listen(PORT, ()=>console.log(`Server chạy tại http://localhost:${PORT}`));
