const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// POST /api/notes - create a note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required."
      });
    }

    const note = await Note.create({ title, content });
    return res.status(201).json(note);
  } catch (error) {
    console.error("POST /api/notes failed:", error.message);
    return res.status(500).json({
      message: "Failed to create note."
    });
  }
});

// GET /api/notes - get all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("GET /api/notes failed:", error.message);
    return res.status(500).json({
      message: "Failed to fetch notes."
    });
  }
});

// DELETE /api/notes/:id - delete a note
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note ID."
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found."
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully.",
      id
    });
  } catch (error) {
    console.error("DELETE /api/notes/:id failed:", error.message);
    return res.status(500).json({
      message: "Failed to delete note."
    });
  }
});

module.exports = router;
