const Recipe= require('../models/recipe');
const express = require('express')
const auth = require('../middlewares/auth')
const Router = new express.Router();
const mongoose = require('mongoose');
// created a single recipe

Router.post('/newrecipe',auth,async(req,res)=>{
    try{
 const newrecipe=  new Recipe({
    ...req.body,
    owner:req.user._id
    });

await newrecipe.save();
res.status(200).send(newrecipe);

}
catch(err){
    res.status(500).send(err);
}
}
);

Router.get('/newrecipe',auth,async(req,res)=>{
    try{
        // this is used to get all tasks craeted by one person

const recipe= await Recipe.find({owner: req.user._id})
res.status(200).send(recipe);

}
catch(err){
    res.status(500).send(err);
}
}
);
// get a single recipe
Router.get('/newrecipe/:id',auth, async(req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({error:'please provide in an id'});

        }
        const singlerecipe = await Recipe.findById({id, owner: req.user._id});
        res.status(200).send(singlerecipe);
    }
    catch(err){
        res.status(400).json(err);
    }

});

// get a single recipe by id and delete
Router.delete('/recipe/:id', auth,async(req,res)=>{ 
    const _id = req.params.id
     try{
    
     const recipe = await Recipe.findOneAndRemove({_id,owner:req.user._id})
     if(!recipe){
        res.status(404).send({message:'recipe  not found'});
     }
     
     res.status(200).send(recipe);
     }
     catch(err){
     res.status(500).send({'message':'recipe not found'})
     }
     
     });
     // update a single recipe by id
Router.patch('/newrecipe/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedupdates = ['recipename','procedure','Ingredients'];
    const isvalidoperation = updates.every((update)=>allowedupdates.includes(update))
    if(!isvalidoperation){
        return res.status(400).send({error:'invalid updates'});

    } 
    try{
        const id = req.params.id
   const recipe =  await Recipe.findOne({id,owner:req.user._id})
   if(!recipe){
     return res.status(400).send('no recipe found');
   }
   updates.forEach((update) => recipe[update] = req.body[update])
        await recipe.save()
   res.status(200).send(recipe);

    }
    catch(err){
  res.status(404).send({error:'something went wrong'});
   }
})
module.exports = Router