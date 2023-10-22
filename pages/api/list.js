import { connectToDatabase } from "../../lib/connectDataBase";

export default async function handler(req, res) {
    
    const { mongoClient } = await connectToDatabase();
    const db = mongoClient.db("sample_restaurants")
    const collection = db.collection("restaurants");

    const results = await collection.find({})
    .project({
        "grades": 0,
        "restaurant_id": 0
    })
    .limit(10).toArray();

    res.status(200).json(results);

}