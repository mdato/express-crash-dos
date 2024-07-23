//const express = require ('express')
import express from 'express'
const router = express.Router()
// Importante: Middleware para parsear JSON
router.use(express.json());

let posts=[
    {id:1, title:'uno'},
    {id:2, title:'dos'},
    {id:3, title:'tres'},
]

router.get('/',(req,res)=>{
    const limit=parseInt(req.query.limit)
    if (!isNaN(limit) && limit>0){
        return res.json(posts.slice(0,limit))
        //http://localhost:8000/posts/?limit=2
    }
    res.json(posts)
    // http://localhost:8000/posts    
})

router.get('/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    //res.json(posts.filter((post)=>post.id===id))
    const post=posts.find((post)=>post.id===id)
    if (!post){
        return res.status(404).json({msg:`a post with the id ${id} was not found`})
        //http://localhost:8000/posts/385
    } 
    res.status(200).json(post)
    //http://localhost:8000/posts/3
})

// creo nuevo post
router.post('/', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ msg: 'Please provide a title!' });
    }

    // Encontrar el máximo id actual en posts
    const maxId = Math.max(...posts.map(post => post.id));

    const newPost = {
        id: maxId + 1,
        title: title
    };

    // Verificar si ya existe un post con el mismo id
    const existingPost = posts.find(post => post.id === newPost.id);
    if (existingPost) {
        return res.status(400).json({ msg: `A post with id ${newPost.id} already exists!` });
    }

    posts.push(newPost);

    res.status(201).json(posts);
});

//update
router.put('/:id',(req,res)=>{
    const { title } = req.body;
    const id=parseInt(req.params.id)
    const post=posts.find((post)=>post.id===id)
    if (!post){
        return res.status(404).json({msg:`a post with the id ${id} was not found`})
    } 
    if (!title){
        return res.status(404).json({msg:'Please provide a title!'})
    } 
    post.title=req.body.title
    res.status(200).json(posts)
})

//delete
router.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const post=posts.find((post)=>post.id===id)
    if (!post){
        return res.status(404).json({msg:`a post with the id ${id} was not found`})
    } 
posts=posts.filter((post)=>post.id !== id)
    res.status(200).json(posts)
})

//module.exports = router
export default router