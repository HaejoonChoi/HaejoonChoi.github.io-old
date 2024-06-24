const request = require('supertest');
const express = require('express');

const app = express();

app.get('/api/list-markdown-files', (req, res) => {
  res.json(['file1.md', 'file2.md']);
});

describe('GET /api/list-markdown-files', () => {
  it('should return a list of markdown files', async () => {
    const res = await request(app).get('/api/list-markdown-files');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(['file1.md', 'file2.md']);
  });
});