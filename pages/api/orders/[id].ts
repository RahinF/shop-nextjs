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
      const result = await db
        .collection("orders")
        .findOne({ _id: new ObjectId(request.query.id as string) });
      const order = JSON.parse(JSON.stringify(result));
      response.status(200).json(order);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  if (method === "PUT") {
    const { status } = request.body;
    try {
      await db
        .collection("orders")
        .updateOne(
          { _id: new ObjectId(request.query.id as string) },
          { $set: { status } }
        );
      return response.status(200).json({ message: "Order updated." });
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
