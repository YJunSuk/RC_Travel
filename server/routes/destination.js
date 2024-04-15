import express from 'express';
const router = express.router();

router.use((req, res, next)=>{
    console.log('middleware for posts');
    next();
})