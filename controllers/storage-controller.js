const { MongoClient, ObjectId } = require("mongodb");
const mongoUtil = require("../db/mongoUtil.js");
const db = mongoUtil.getDb();

const TEST_DB = process.env.TEST_DB;
const uri = process.env.URI_SHANE;

/////////////////////////
// Sample find with Mongo Driver
/////////////////////////

// Create and Save a new Item
exports.create = (req, res) => {
  const username = req.session.user;
  console.log("CREATE called with user=" + username);

  if (!username) {
    res.status(401).send("User unauthorized.");
    return;
  }

  let data = {
      user: username,
      item: req.body.item,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      purchased: new Date(req.body.purchasedDate),
      daysLast: req.body.daysLast,
  };

  db.collection('storages')
    .insertOne(data, (err, results) => {
      if (err) console.error(err || `Error occurred when inserting data=${data}.`);
      console.log('Storage CREATE results: ', results);
      res.status(201);
      res.redirect('/storage');
    });
};

// Retrieve all Items from the database.
exports.findAll = (req, res) => {
  MongoClient.connect(uri, async (err, client) => {
    try {
      const storages = client.db(TEST_DB)
        .collection('storages');

      const query = {};
      const options = {
        sort: { name: 1 },
        projection: { name: 1, item: 1, category:1, price: 1, quantity: 1, purchased: 1, daysLast: 1 },
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

// Find a list of Items with User (name)
exports.findUser = async (req, res) => {
  const user = req.session.user;
  console.log("Endpoint findUser called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized.");
    return;
  }

  try {
    // const query = { _id : new ObjectId("634e3e1e8ec04f9c6059d753") }; // By Id
    // const query = { "category": category }; // By Category
    const query = { user : user }; // By User
    const options = {
      sort: { name: 1 },
      projection: { user: 1, name: 1, item: 1, category: 1, price: 1, quantity: 1, purchased: 1, daysLast: 1 },
    };
    
    db.collection('storages')
      .find(query, options).toArray((err, results) => {
        if (err) throw err;
        console.log('results', results);
        res.send(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500)
      .send({ message:
        err.message || `Error occurred while retrieving Storage Item for user=${user}.`
      });
  }
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
  console.log("delete called with id: ", id);

  const query = { _id: new ObjectId(id) };
  db.collection("storages")
    .deleteOne(query, (err, results) => {
      if (err) console.error(err || `Error occurred when deleting id=${id}.`);
      // console.log('results', results);

      let msg = "";
      if (results.deletedCount === 1) {
        msg = "Successfully deleted one document.";
      } else {
        msg = `No document matched id=${id}. Deleted 0 document.`;
      }
      console.log(msg);
      res.send(msg);
    });
};


// Update a Item by the id in the request
exports.update = (req, res) => {
  
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  
};
//////////////////////////////////////////////////
exports.deleteOne = deleteOne;

function deleteOne(id) {
  const query = { _id: new ObjectId(id) };
  db.collection("storages")
    .deleteOne(query, (err, results) => {
      if (err) console.error(err || `Error occurred when deleting id=${id}.`);
      // console.log('results', results);

      let msg = "";
      if (results.deletedCount === 1) {
        msg = "Successfully deleted one document.";
      } else {
        msg = `No document matched id=${id}. Deleted 0 document.`;
      }
      console.log(msg);
      return msg;
    });
}