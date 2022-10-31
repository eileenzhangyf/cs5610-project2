const { MongoClient } = require("mongodb");

const uri = process.env.URI_SHANE || "mongodb://localhost:27017/foodkeeper";
let _db;

module.exports = {
    connectToServer: function( callback ) {
        MongoClient.connect(uri, (err,client) => {
            _db = client.db(process.env.TEST_DB);
            return callback( err );
        });
    },

    getDb: function() {
        return _db;
    }
};

// Reference: 
//   https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
