let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SavedSchema = new Schema({
    title: String,
    link: String
});
let Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;