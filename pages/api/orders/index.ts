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
      const result = await db.collection("orders").find({}).toArray();
      const orders = JSON.parse(JSON.stringify(result));
      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const { data } = request.body;
      const order = await db.collection("orders").insertOne(data);
      response.status(201).json({ id: order.insertedId });
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
