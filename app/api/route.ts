import clientPromise from "../mongodb";
import { NextResponse } from "next/server.js";

export async function GET(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  const allPosts = await db.collection("posts").find({}).toArray();
  return NextResponse.json(allPosts);
}

export async function POST(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  let bodyObject = await req.json();
  let myPost = await db.collection("posts").insertOne(bodyObject);
  return NextResponse.json(myPost);
}

export async function DELETE(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  let deleted = await db.collection("posts").deleteMany({});
  return NextResponse.json(deleted);
}
