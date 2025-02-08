import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  genre: String,
  publishedYear: Number,
  description: String,
  image: String,
});

export default mongoose.model("Book", bookSchema);
