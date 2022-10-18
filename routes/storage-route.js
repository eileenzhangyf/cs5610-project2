const router = require('express').Router();
const storages = require("../controllers/storage-controller.js");

// Create a new Item
router.post("/", storages.create);

// Retrieve all Items
router.get("/", storages.findAll);

// Retrieve a single Item with id
router.get("/:id", storages.findOne);

// Update a Item with id
router.put("/:id", storages.update);

// Delete a Item with id
router.delete("/:id", storages.delete);

// Delete all Items
// router.delete("/", storages.deleteAll);

module.exports = router;