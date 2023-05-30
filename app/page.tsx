"use client";

import { useEffect, useState } from "react";
import checkEnvironment from "./lib/environment.js";

// const fetchNote = async () => {
//   const response = await fetch(`${checkEnvironment()}/api`, {
//     cache: "no-store",
//   });
//   return await response.json();
// };

export default async function Home() {
  const [posts, setPosts] = useState<any>();
  console.log(posts);
  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`${checkEnvironment()}/api`, {
        cache: "no-store",
      });
      return await response.json();
    };

    fetchNote().then((res) => {
      console.log(res);
      setPosts(res);
    });
  }, []);
  const [title, setTitle] = useState<string>("");
  const submitForm = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
    });
    res = await res.json();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <main>
      {posts?.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
      <form>
        <input type="text" name="title" onChange={handleChange}></input>
        <input type="submit" onSubmit={submitForm}></input>
      </form>
    </main>
  );
}
