// api/list.js
import { connectToDatabase } from "../../lib/connectDataBase";

export default async function handler(req, res) {
  const { mongoClient } = await connectToDatabase();
  const db = mongoClient.db("sample_restaurants");
  const collection = db.collection("restaurants");

  if (req.method === "GET") {
    const limit = 200; // Limit the initial query to 20 restaurants

    // Check if there's a search query in the URL
    if (req.query.search) {
      const searchQuery = req.query.search;
      const searchResults = await collection
        .find({ name: { $regex: searchQuery, $options: "i" } }) // Case-insensitive search
        .limit(limit)
        .toArray();
      res.status(200).json(searchResults);
    } else {
      const results = await collection.find({}).project({
        "grades": 0,
        "restaurant_id": 0
      }).limit(limit).toArray();
      res.status(200).json(results);
    }
  }
}
