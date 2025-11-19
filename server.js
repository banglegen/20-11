// NodeJS server cho web 20/11 tin nhắn
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // public chứa HTML + ảnh

const MSG_FILE = path.join(__dirname, 'messages.json');

// Gửi tin nhắn
app.post('/send', (req, res) => {
    const { name, message } = req.body;
    if(!name || !message) return res.status(400).json({error:'Thiếu tên hoặc nội dung'});

    let messages = [];
    if(fs.existsSync(MSG_FILE)){
        messages = JSON.parse(fs.readFileSync(MSG_FILE, 'utf8'));
    }

    messages.push({name, message});
    fs.writeFileSync(MSG_FILE, JSON.stringify(messages, null, 2));
    res.json({status:'ok'});
});

// Lấy tất cả tin nhắn
app.get('/messages', (req, res) => {
    if(!fs.existsSync(MSG_FILE)) return res.json([]);
    const messages = JSON.parse(fs.readFileSync(MSG_FILE, 'utf8'));
    res.json(messages);
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
