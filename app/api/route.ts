import clientPromise from "../lib/mongodb.js";
import { NextResponse } from "next/server.js";

export async function GET(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  const allPosts = await db.collection("posts").find({}).toArray();
  console.log(allPosts);

  return NextResponse.json(allPosts);
}

export async function POST(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  let bodyObject = JSON.parse(req.body);
  let myPost = await db.collection("posts").insertOne(bodyObject);
}
