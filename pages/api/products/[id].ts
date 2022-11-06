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

    const { data } = request.body;

    switch (request.method) {
      case "GET":
        const result = await db
          .collection("products")
          .findOne({ _id: new ObjectId(request.query.id as string) });
        const product = JSON.parse(JSON.stringify(result));
        return response.status(200).json(product);

      case "PUT":
        await db
          .collection("products")
          .updateOne(
            { _id: new ObjectId(request.query.id as string) },
            { $set: data }
          );
        return response.status(200).json({ message: "product updated" });

      default:
        break;
    }
  } catch (error) {
    response.status(500).json({ message: "something went wrong", error });
  }
}
