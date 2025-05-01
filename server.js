const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use('/pdfs', express.static('pdfs'));

const storage = multer.diskStorage({
  destination: 'pdfs/',
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.get('/api/list', (req, res) => {
  fs.readdir('pdfs/', (err, files) => res.json(files.filter(f => f.endsWith('.pdf'))));
});

app.post('/api/upload', upload.single('pdf'), (req, res) => {
  res.sendStatus(200);
});

app.delete('/api/delete/:name', (req, res) => {
  const filePath = path.join(__dirname, 'pdfs', req.params.name);
  fs.unlink(filePath, err => res.sendStatus(err ? 500 : 200));
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
