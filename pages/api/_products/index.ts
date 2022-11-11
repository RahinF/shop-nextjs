import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("shop");

    // PUT: uses req.body.param.id
    // DELETE: uses req.query.id

    const { data } = request.body;

    switch (request.method) {
      case "GET":
        const result = await db.collection("products").find({}).toArray();
        const products = JSON.parse(JSON.stringify(result));
        return response.status(200).json(products);

      case "POST":
        await db.collection("products").insertOne(data);
        return response.status(201).json({ message: "product created" });

      case "DELETE":
        await db
          .collection("products")
          .deleteOne({ _id: new ObjectId(request.query.id as string) });

        return response.status(200).json({ message: "product deleted" });

      default:
        break;
    }
  } catch (error) {
    response.status(500).json({ message: "something went wrong", error });
  }
}
