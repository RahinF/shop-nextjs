import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  const client = await clientPromise;
  const db = client.db("shop");

  if (method === "GET") {
    try {
      const result = await db.collection("products").find({}).toArray();
      const products = JSON.parse(JSON.stringify(result));
      return response.status(200).json(products);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const { data } = request.body;
      // console.log(request.body) // use request.body with postman
      await db.collection("products").insertOne(data);
      return response.status(201).json({ message: "Product created." });
    } catch (error) {
      response.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(request.query.id as string) });

      return response.status(200).json({ message: "Product deleted." });
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
