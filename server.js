const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// إعدادات
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// صفحة رئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// استقبال رسائل التواصل
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = { name, email, message, date: new Date().toISOString() };

  // حفظ بالملف messages.json
  let messages = [];
  if (fs.existsSync('messages.json')) {
    messages = JSON.parse(fs.readFileSync('messages.json'));
  }
  messages.push(newMessage);
  fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

  res.json({ status: 'success', message: 'تم إرسال رسالتك بنجاح!' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});