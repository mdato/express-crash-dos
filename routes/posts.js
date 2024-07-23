//const express = require ('express')
import express from 'express'
const router = express.Router()

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
    // http://localhost:8000/posts/3
    const post=posts.find((post)=>post.id===id)
    if (!post){
        return res.status(404).json({msg:`a post with the id ${id} was not found`})
        //http://localhost:8000/posts/385
    } 
    res.status(200).json(post)
    //http://localhost:8000/posts/3
})

//module.exports = router
export default router