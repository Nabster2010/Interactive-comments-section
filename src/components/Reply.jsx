import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import Counter from "./Counter";
import UserInfo from "./UserInfo";
import ActionBtn from "./ActionBtn";
import ReplyBtn from "./ReplyBtn";
import ReplyMentionForm from "./ReplyMentionForm";
import ConfirmModal from "./ConfirmModal";

const Reply = ({ reply, commentId }) => {
  const { currentUser } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState(
    `@${reply.replyingTo} ${reply.content}`
  );
  const { deleteReply, editReply } = useDataContext();
  const handleDelete = () => {
    deleteReply(commentId, reply.id);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editReply(commentId, reply.id, content);
    setEditMode(false);

  };

  const isCurrentUser = reply?.user?.username === currentUser?.username;
  return (
    <>
      <div className="mt-2">
        <div className="relative bg-white  flex flex-col-reverse md:flex-row justify-center md:items-start gap-6 rounded-xl shadow-sm font-Rubic p-6">
          <Counter isReply parentId={commentId} data={reply} />
          <div className="relative space-y-4 flex-1">
            <UserInfo user={reply?.user} createdAt={reply?.createdAt} />
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
              <p className="text-GrayishBlue">
                <strong className="text-ModerateBlue text-base font-medium cursor-pointer">
                  @{reply.replyingTo}
                </strong>
                {"   "}
                {reply?.content}
              </p>
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
          <ReplyMentionForm
            commentId={commentId}
            data={reply}
            hideForm={() => setFormOpen(false)}
          />
        )}
      </div>
      <ConfirmModal
        modalOpen={modalOpen}
        handleDelete={handleDelete}
        closeModal={() => setModalOpen(false)}
      />
    </>
  );
};

export default Reply;
