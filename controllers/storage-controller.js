const { MongoClient } = require("mongodb");

const sItem = require("../models/storage-model");

const TEST_USER = "Shane"; // TODO: Implement feat-user
const TEST_DB = 'test';
const PROD_DB = 'prod';

const uri = process.env.URI_SHANE;

/////////////////////////
// Sample find with Mongo Driver
/////////////////////////
exports.findAll = (req, res) => {
  // const user = req.query.user;

  console.log('my uri', uri);
  MongoClient.connect(uri, async (err, client) => {
    try {
      const storages = client.db(TEST_DB).collection('storages');

      /* 
        Reference: 
          https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
          https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      */
      const query = {};
      const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { name: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { _id: 0, name: 1, item: 1, category:1, price: 1, quantity: 1, purchased: 1, daysLast: 1 },
      };

      // print a message if no documents were found
      let cnt = await storages.countDocuments(query);
      console.log('count: ',  cnt);
      if (cnt == 0) console.error("No documents found for storages!");

      const cursor = storages.find(query, options);
      // await cursor.forEach(console.dir);

      console.log('\n\n\ndata:');;
      let data = await cursor.toArray();
      console.log(data);

      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500)
        .send({ message:
                err.message || "Some error occurred while retrieving Storage Items."
            });
    } finally {
      await client.close();
    }
  });
};

//////////////////////////////////////////////////

/////////////////////////
// Depreciated Methods with Mongoose
/////////////////////////

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
// exports.findAll = (req, res) => {
//   // const user = req.query.user;
//   console.log('Endpoint findAll is called.');

//   const user = TEST_USER;
//   let condition = user
//     ? { user: { $regex: new RegExp(user), $options: "i" } }
//     : {};

//   sItem.find(condition)
//     .then(data => {
//       console.log('export data: ' + data);
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500)
//         .send({ message:
//           err.message || "Some error occurred while retrieving Storage Items."
//       });
//     });
// };

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
