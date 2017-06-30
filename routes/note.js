/**
 * Created by wildi on 22.06.17.
 */


const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');



router.get("/", notes.notesGet);
router.post("/", notes.noteCreate);
router.put("/:id/", notes.noteUpdate);
router.get("/:id/", notes.noteShow);

module.exports = router;