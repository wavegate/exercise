"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

export default function Post({ post }) {
  const { mutate } = useSWRConfig();
  const [editing, setEditing] = useState<boolean>(false);
  const [form, setForm] = useState<any>({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submit = () => {
    fetch(`/api/${post._id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setEditing(false);
    mutate("/api");
  };

  const deletePost = () => {
    fetch(`/api/${post._id}`, {
      method: "DELETE",
    });
  };
  return (
    <div key={post._id}>
      {editing ? (
        <input name="title" onChange={handleChange}></input>
      ) : (
        <div>{post.title}</div>
      )}
      <div>
        <button onClick={submit}>Save</button>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={deletePost}>Delete</button>
      </div>
    </div>
  );
}
