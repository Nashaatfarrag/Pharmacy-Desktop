const low = require("lowdb");
const shortid = require('shortid')
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ moves: [] , drugs : [], user: {}, count: 0 }).write();


// Add a post
function addRecord(collection, data) {
  data._id = shortid.generate() ;
  db.get(collection)
    .push(data)
    .write().id;
}
/*
db.get("posts")
  .push({ id: 1, title: "lowdb is awesome" })
  .write();
*/
// * Set a user using Lodash shorthand syntax
//db.set("user.name", "typicode").write();

function readRecord(collection) {
  return db.get(collection).value();
}
// Increment count
db.update("count", n => n + 1).write();

function findById ( collection , id ){
   return db
  .get(collection)
  .find({ _id: id })
  .value()
}

function findByValue(collection , value){

  return db.get(collection).find(value).value()
}


module.exports = { addRecord , readRecord , findById , data : db};
