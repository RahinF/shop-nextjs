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
        .collection("products")
        .findOne({ _id: new ObjectId(request.query.id as string) });
      const product = JSON.parse(JSON.stringify(result));
      response.status(200).json(product);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  if (method === "PUT") {
    const { data } = request.body;
    try {
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(request.query.id as string) },
          { $set: data }
        );
      return response.status(200).json({ message: "Product updated." });
    } catch (error) {
      response.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      const result = await db
        .collection("products")
        .findOneAndDelete({ _id: new ObjectId(request.query.id as string) });

      const title = result.value?.title;

      response.status(200).json(title);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
