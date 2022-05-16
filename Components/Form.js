import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom.js";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [input, setInput] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  //console.log(input);
  async function uploadPost(e) {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoURL: photoURL,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    //console.log(data);
    setHandlePost(true);

    setModalOpen(false);
  }
  return (
    <form className="relative flex flex-col space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL"
        className="max-w-xs truncate bg-transparent focus:outline-none dark:placeholder-white/75 md:max-w-sm "
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white px-3.5 py-1 rounded-full"
        disabled={!input.trim() && !photoURL.trim()}
        type="submit"
        onClick={uploadPost}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
