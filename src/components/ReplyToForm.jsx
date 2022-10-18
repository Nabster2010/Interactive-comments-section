import Avatar from "./Avatar";
import { useDataContext } from "../context/DataContext";
import { useRef } from "react";
const ReplyToForm = ({ data }) => {
  const textareaRef = useRef();

  const { currentUser, replyToComment } = useDataContext();

  const handleAddReply = (e) => {
    e.preventDefault();
    replyToComment(data.id, textareaRef.current.value);
    textareaRef.current.value = "";
    alert("Reply added");
  };

  return (
    <form
      onSubmit={handleAddReply}
      className=" bg-white flex flex-col md:flex-row md:items-start md:justify-center md:gap-6 gap-4 rounded-xl shadow-sm font-Rubic p-6 mt-2"
    >
      <div className="flex-1 md:order-2">
        <textarea
          required
          autoFocus
          rows={3}
          ref={textareaRef}
          placeholder="Add a reply..."
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
          Reply
        </button>
      </div>
    </form>
  );
};
export default ReplyToForm;