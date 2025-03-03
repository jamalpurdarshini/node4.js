const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const folderPath = path.join(__dirname, 'myFolder');

// Default Route (Fixes "Cannot GET /" Issue)
app.get('/', (req, res) => {
    res.send('welcome to my world');
});

// API to create a folder
app.get('/create-folder', (req, res) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        res.send('Folder created successfully.');
    } else {
        res.send('Folder already exists.');
    }
});

// API to delete folder and its files
app.get('/delete-folder', (req, res) => {
    if (fs.existsSync(folderPath)) {
        fs.readdir(folderPath, (err, files) => {
            if (err) return res.status(500).send('Error reading folder.');

            files.forEach(file => {
                fs.unlinkSync(path.join(folderPath, file));
            });

            fs.rmdir(folderPath, (err) => {
                if (err) return res.status(500).send('Error deleting folder.');
                res.send('Folder and all its contents deleted.');
            });
        });
    } else {
        res.send('Folder does not exist.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});