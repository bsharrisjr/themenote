const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'background-images/' });
const gallery = multer({ dest: 'gallery-image/' });
const PORT = 5000;

app.use(express.json());
app.use(cors());



app.post('/upload', upload.single('image'), (req, res) => {

  const tempPath = req.file.path;
  const targetDirectory = 'background-images/';
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
  }

  const targetPath = path.join(__dirname, targetDirectory, req.file.originalname);

  fs.rename(tempPath, targetPath, err => {
    if (err) {
      console.error('Error moving file:', err);
      res.status(500).send('Error uploading file');
    } else {
      console.log('File saved successfully');
      res.sendStatus(200);
    }
  });
});

app.post('/gallery', gallery.single('image'), (req, res) => {
  const tempPath = req.file.path;
  const targetDirectory = 'gallery-image/';
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
  }

  const targetPath = path.join(__dirname, targetDirectory, req.file.originalname);

  fs.rename(tempPath, targetPath, err => {
    if (err) {
      console.error('Error moving file:', err);
      res.status(500).send('Error uploading file');
    } else {
      console.log('File saved successfully');
      res.sendStatus(200);
    }
  });
  const newObject = { "url": req.file.originalname };
  fs.readFile('gallery.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const dataArray = JSON.parse(data);
    dataArray.push(newObject);
    const newData = JSON.stringify(dataArray);
    fs.writeFile('gallery.json', newData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send("Error writing file");
      }
      res.status(200).send("New object added successfully");
    });
  });
});




app.post('/addData', (req, res) => {
  const newObject = req.body;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const dataArray = JSON.parse(data);
    dataArray.push(newObject);
    const newData = JSON.stringify(dataArray);
    fs.writeFile('data.json', newData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send("Error writing file");
      }
      res.status(200).send("New object added successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




