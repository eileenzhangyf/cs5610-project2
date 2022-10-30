const router = require("express").Router();
const storages = require("../controllers/storage-controller.js");

// Create a new Item
router.post("/", storages.create);

// Retrieve all Items
router.get("/", storages.findAll);

// Retrieve a list of Items with user (name)
router.get("/user", storages.findUser);

// Delete a Item with id
router.delete("/:id", storages.delete);

module.exports = router;
