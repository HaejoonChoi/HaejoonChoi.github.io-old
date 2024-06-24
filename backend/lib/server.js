require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Website Blog API',
            version: '1.0.0',
            description: 'APIs for serving markdown files as blog posts',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['lib/server.js'], // Path to the API docs
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/list-markdown-files:
 *   get:
 *     summary: Lists all markdown files
 *     responses:
 *       200:
 *         description: A list of markdown files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Unable to scan directory
 */
app.get('/api/list-markdown-files', (req, res) => {
    const directoryPath = path.join(__dirname, '../public/mdfiles');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        // debug output to console
        console.log(files);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        res.json(markdownFiles);
    });
});

// another api for actual markdown content. will take a file name as a parameter, then returns the content of the file
/**
 * @swagger
 * /api/get-markdown-content/{fileName}:
 *   get:
 *     summary: Get markdown content
 *     parameters:
 *       - in: path
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the markdown file
 *     responses:
 *       200:
 *         description: The markdown content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: The file was not found
 */
app.get('/api/get-markdown-content/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../public/mdfiles', fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('The file was not found');
        }
        res.set('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});