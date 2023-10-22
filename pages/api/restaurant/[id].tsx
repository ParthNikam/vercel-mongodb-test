import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/connectDataBase";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    const id: string = req.query.id as string; // Predeclare id as a string

    try {
      if (!id) {
        res.status(400).json({ error: "Missing restaurant ID" });
        return;
      }

      // Convert id to ObjectId
      const objectId = new ObjectId(id);

      const { mongoClient } = (await connectToDatabase()) as { mongoClient: any, database: any };
      const db = mongoClient.db("sample_restaurants");
      const collection = db.collection("restaurants");

      // Find the restaurant by its _id using ObjectId
      const restaurant = await collection.findOne({ _id: objectId });

      if (restaurant) {
        res.status(200).json(restaurant);
      } else {
        res.status(404).json({ error: "Restaurant not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching the restaurant" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
