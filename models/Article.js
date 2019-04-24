let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        default: false
    }
});
let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;