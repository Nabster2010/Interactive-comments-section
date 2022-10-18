import Avatar from "./Avatar";
import { useDataContext } from "../context/DataContext";
import { useRef } from "react";
const CommentForm = () => {
  const textareaRef = useRef();
  const { currentUser, addComment } = useDataContext();

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment(textareaRef.current.value);
    textareaRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleAddComment}
      className=" bg-white flex flex-col md:flex-row md:items-start md:justify-center md:gap-6 gap-4 rounded-xl shadow-sm font-Rubic p-6"
    >
      <div className="flex-1 md:order-2">
        <textarea
          autoFocus
          required
          rows={3}
          ref={textareaRef}
          placeholder="Add a comment..."
          className="text-GrayishBlue w-full p-3 rounded-xl  focus:outline-none focus:border-ModerateBlue border"
          type="textarea"
          name=""
        />
      </div>
      <div className="md:contents flex justify-between items-center">
        <Avatar img={currentUser?.image?.png} />

        <button
          type="submit"
          className="bg-ModerateBlue px-6 md:order-3 py-3 rounded-xl transition hover:bg-LightGrayishBlue text-white font-medium"
        >
          Send
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
