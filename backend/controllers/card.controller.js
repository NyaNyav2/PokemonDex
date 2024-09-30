import Cards from "../models/cards.model.js";
import mongoose from "mongoose";

// Assuming this is your backend API route
export const getCards = async (req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 9;
   const skip = (page - 1) * limit;
 
   const searchTerm = req.query.search; // Capture the search term from the query string
   const generation = parseInt(req.query.generation); // Filter by generation
   const type1 = req.query.type1; // Filter by primary type (type1)
   const species = req.query.species; // Filter by species
   const special_group = req.query.special_group; // Filter by special group
   try {
     let query= {}; // Define a query object to hold search criteria
     if (searchTerm) {
       query = { name: { $regex: searchTerm, $options: 'i' } }; // Case-insensitive search on 'name' field
     }
     // Filter by generation if provided 
     if(!isNaN(generation) && generation>=1 && generation <= 9){
       query.generation=generation;
     }
     // Filter by type1 if provided
     if (type1) {
      query.type1 = type1;
    }

    // Filter by species if provided
    if (species) {
      query.species = species;
    }

    // Filter by special group if provided
    if (special_group) {
      query.special_group = special_group;
    }
     
     const cards = await Cards.find(query).skip(skip).limit(limit);
     const totalCards = await Cards.countDocuments(query); // Count documents matching the search
 
     res.status(200).json({
       success: true,
       data: cards,
       currentPage: page,
       totalPages: Math.ceil(totalCards / limit),
     });
   } catch (error) {
     res.status(500).json({ success: false, message: "Server error" });
   }
 };

 export const postCards = async (req,res)=>{
    const card = req.body
    if(!card.name || !card.generation || !card.type1){
       return res.status(400).json({success:false, message: "Fill in basic info first"});
    }
    const newCard = new Cards(card)
    try {
       await newCard.save();
       res.status(201).json({success:true, data:newCard})
    } catch(error){
   console.error("error in create card:", error.message)
   res.status(500).json({success:false, message:"server error"})
    }
   }

export const putCards =async(req,res)=>{
    const {id} =req.params
    const card =req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({success:false, message:"invalid card input ID"})
    }
    
    try{
       const updateCard = await Cards.findByIdAndUpdate(id,card,{new:true});
       res.status(200).json({success:true, data:updateCard})
    }catch(error){
       res.status(500).json({success:false, message:"server erorr"})
    }
 }

export const deleteCard= async(req,res)=>{
    const {id} =req.params
    try{
       await Cards.findByIdAndDelete(id)
       res.status(200).json({success:true, message:"Product deleted"})
    }catch (error){
       console.log("error in delete data",error.message)
       res.status(500).json({success:false, message:"server error"})
    }
 }

