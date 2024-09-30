import express from "express"

import { deleteCard, getCards, postCards, putCards } from "../controllers/card.controller.js";
const router =express.Router();
router.get('/',getCards)
 router.post("/", postCards)
 
 router.put("/:id",putCards)
 router.delete("/:id",deleteCard)

export default router