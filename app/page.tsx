"use client";
import useSWR from "swr";
import { useState } from "react";
import Post from "./components/post";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, mutate, error } = useSWR(`/api`, fetcher);

  const [title, setTitle] = useState<string>("");

  const submitForm = (e) => {
    e.preventDefault();
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
    });
    mutate([...data, { id: Math.random(), title: title }], false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const deleteAll = () => {
    fetch("/api", {
      method: "DELETE",
    });
    mutate([]);
  };

  const deletePost = (id) => {
    fetch(`/api/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <main>
      {data?.map((post: any) => {
        return <Post post={post} key={post._id} />;
      })}
      <form>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          className={`border border-solid border-black`}
        ></input>
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
        <button type="submit" onClick={deleteAll}>
          Delete all
        </button>
      </form>
    </main>
  );
}
