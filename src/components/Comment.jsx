import React, { useState } from "react";
import { useDataContext } from "../context/DataContext";
import Counter from "./Counter";
import UserInfo from "./UserInfo";
import ActionBtn from "./ActionBtn";
import Reply from "./Reply";
import ReplyBtn from "./ReplyBtn";
import CommentReplyForm from "./CommentReplyForm";
import ConfirmModal from "./ConfirmModal";

const Comment = ({ comment }) => {
  const { replies } = comment;
  const { currentUser } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState(comment.content);
  const { deleteComment, editComment } = useDataContext();
  const handleDelete = () => {
    deleteComment(comment.id);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editComment(comment.id, content);
    setEditMode(false);
  };

  const isCurrentUser = comment?.user?.username === currentUser?.username;
  return (
    <div className="">
      <div className="relative bg-white flex flex-col-reverse md:flex-row justify-center md:items-start gap-6 rounded-xl shadow-sm font-Rubic p-6 ">
        <Counter data={comment} />
        <div className="relative space-y-4 flex-1">
          <UserInfo user={comment?.user} createdAt={comment?.createdAt} />
          {editMode ? (
            <form onSubmit={handleEdit} className="flex flex-col gap-2">
              <textarea
                required
                onChange={(e) => setContent(e.target.value)}
                value={content}
                rows={3}
                placeholder="Add a comment..."
                className="text-GrayishBlue w-full p-3 rounded-xl  focus:outline-none focus:border-ModerateBlue border"
                type="textarea"
                name="content"
              />
              <button
                type="submit"
                className="self-end bg-ModerateBlue px-6 md:order-3 py-3 rounded-xl transition hover:bg-LightGrayishBlue text-white font-medium"
              >
                Update
              </button>
            </form>
          ) : (
            <p className="text-GrayishBlue">{comment?.content}</p>
          )}
        </div>
        {isCurrentUser ? (
          <ActionBtn
            setEditMode={setEditMode}
            openConfirmModal={() => setModalOpen(true)}
          />
        ) : (
          <ReplyBtn handleClick={() => setFormOpen(!formOpen)} />
        )}
      </div>
      {formOpen && (
        <CommentReplyForm
          comment={comment}
          hideForm={() => setFormOpen(false)}
        />
      )}
      <div className="flex justify-center ">
        <div className="w-0.5 bg-LightGray mt-2 md:mx-10 mr-4 "></div>
        <div className="flex-1 ">
          {replies &&
            replies.map((reply) => (
              <Reply key={reply.id} reply={reply} commentId={comment.id} />
            ))}
        </div>
      </div>
      <ConfirmModal
        modalOpen={modalOpen}
        handleDelete={handleDelete}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Comment;
