const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req,res) => {


    // get movieId from Frontend
    // get number of favorite from mongodb
    // exec = query db 
    Favorite.find({"movieId":req.body.movieId,"userForm":req.body.userForm})
        .exec((err,info) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true , favoriteNumber:info.length})
        })
    

})

router.post('/favorited', (req,res) => {
    // check whether user added this movie inth favoritelist
    Favorite.find({"movieId":req.body.movieId})
    //movieId and userForm are variables from Favorite.js 
        .exec((err,info) => {
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !==0){
                result = true;
            }
            res.status(200).json({success:true, favorited:result})
        })
    
})

router.post('/removeFromFavorite', (req,res) => {

    Favorite.findOneAndDelete({movieId:req.body.movieId,userForm:req.body.userForm})
     .exec( (err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true,doc})
    })
})


router.post('/addToFavorite', (req,res) => {
    const favorite = new Favorite(req.body)
    favorite.save((err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
})


router.post('/getFavoredMovie', (req,res) => {
   Favorite.find({'userForm': req.body.userForm})
        .exec((err,favorites) => { 
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })
})


router.post('/getFavoredMovie', (req,res) => {
    Favorite.find({'userForm': req.body.userForm})
         .exec((err,favorites) => { 
             if(err) return res.status(400).send(err)
             return res.status(200).json({success:true, favorites})
         })
 })
 


 
router.post('/removeFromFavorite', (req,res) => {

    Favorite.findOneAndDelete({movieId:req.body.movieId,userForm:req.body.userForm})
     .exec( (err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true,doc})
    })
})



module.exports = router;
