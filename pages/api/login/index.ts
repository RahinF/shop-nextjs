import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  if (method === "POST") {
    try {
      const { username, password } = request.body;

      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        response.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN as string, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
            secure: true,
          })
        );

        return response.status(200).json("login success");
      }

      response.status(400).json("Username or Password is invalid.");
    } catch (error) {
      response.status(500).json(error);
    }
  }
}
