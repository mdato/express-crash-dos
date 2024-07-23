//const express = require ('express')
import express from 'express';
import { fileURLToPath } from 'url';
//const path = require ('path')
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()

//const posts = require('../routes/posts')
import posts from '../routes/posts.js'
// setup static folder
app.use(express.static(path.join(__dirname, '../public')))
app.use('/posts', posts)
const port = process.env.PORT || 8000
app.listen(port, ()=>console.log(`server running in port: ${port}`))