const sItem = require("../models/storage-model");
const TEST_USER = "Shane"; // TODO: Implement feat-user
// Create and Save a new Item
exports.create = (req, res) => {
  const item = new sItem({
        user: TEST_USER,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        purchased: new Date(req.body.purchasedDate),
        daysLast: req.body.daysLast,
    });

  item.save(item)
    .then(data => {
      res.send(data);
      console.log('Item saved successfully!\n', data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Errors occurred while creating the Storage Item."
      });
    });

};


// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  // const user = req.query.user;
  const user = TEST_USER;
  let condition = user
    ? { user: { $regex: new RegExp(user), $options: "i" } }
    : {};

  sItem.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500)
        .send({ message:
          err.message || "Some error occurred while retrieving Storage Items."
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  sItem.findById(id)
    .then(data => {
      if (!data)
        res.status(404)
          .send({ message: "Item with id=" + id + " not found" });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  sItem.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}.`
        });
      } else {
        res.send({
          message: "Item was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Item with id=${id}.`
      });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  
};
