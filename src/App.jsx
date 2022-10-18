import React from "react";
import "./App.css";
import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";
import { useDataContext } from "./context/DataContext";

function App() {
  const { comments } = useDataContext();

  return (
    <div className="min-h-screen px-6 flex py-16 justify-center bg-VeryLightGray  ">
      <div className=" w-full max-w-4xl space-y-4 ">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
        <CommentForm />
      </div>
    </div>
  );
}

export default App;
