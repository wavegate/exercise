import { ObjectId } from "mongodb";
import clientPromise from "../../mongodb";
import { NextResponse } from "next/server.js";
export async function DELETE(
  req: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  let deleted = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json(deleted);
}

export async function PUT(
  req: any,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const db = client.db("posts-database");
  let bodyObject = await req.json();
  let deleted = await db
    .collection("posts")
    .findOneAndUpdate({ _id: new ObjectId(params.id) }, { $set: bodyObject });
  return NextResponse.json(deleted);
}
