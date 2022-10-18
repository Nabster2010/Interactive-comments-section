import React from "react";
import { useContext, useState } from "react";
import data from "../../data.json";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DataContext = React.createContext(null);
export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [comments, setComments] = useLocalStorage("comments", data.comments);

  const [currentUser, setCurrentUser] = useState(data.currentUser);
  const addComment = (content) => {
    setComments([
      ...comments,
      {
        id: uuidv4(),
        content: content,
        createdAt: Date.now(),
        score: 0,
        user: currentUser,
      },
    ]);
  };
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };
  const editComment = (id, newContent) => {
    const newState = comments.map((comment) => {
      if (comment.id !== id) {
        return comment;
      }
      return { ...comment, content: newContent };
    });
    setComments(newState);
  };
  const voteCommentUp = (id) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, score: comment.score + 1 };
        }
        return comment;
      })
    );
  };
  const voteCommentDown = (id) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, score: comment.score - 1 };
        }
        return comment;
      })
    );
  };
  const voteReplyUp = (parentId, replyId) => {
    setComments([
      ...comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    score: reply.score + 1,
                  };
                } else {
                  return reply;
                }
              }),
            ],
          };
        } else {
          return comment;
        }
      }),
    ]);
  };
  const voteReplyDown = (parentId, replyId) => {
    setComments([
      ...comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                  };
                } else {
                  return reply;
                }
              }),
            ],
          };
        } else {
          return comment;
        }
      }),
    ]);
  };

  const replyToComment = (commentId, reply, replyTo) => {
    setComments([
      ...comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuidv4(),
                content: reply?.replace(reply.match(/\B@\w+/g), ""),
                createdAt: Date.now(),
                score: 0,
                replyingTo: reply.match(/\B@\w+/g)
                  ? String(reply.match(/\B@\w+/g)).replace("@", "")
                  : replyTo || comment?.user?.username,
                user: currentUser,
              },
            ],
          };
        } else {
          return comment;
        }
      }),
    ]);
  };
  const editReply = (commentId, replyId, content) => {
    setComments([
      ...comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === replyId) {
                  return {
                    ...reply,
                    content: content?.replace(content.match(/\B@\w+/g), ""),
                    replyingTo: content.match(/\B@\w+/g)
                      ? String(content.match(/\B@\w+/g)).replace("@", "")
                      : comment?.user?.username,
                  };
                } else {
                  return reply;
                }
              }),
            ],
          };
        } else {
          return comment;
        }
      }),
    ]);
  };

  const deleteReply = (commentId, replyId) => {
    setComments([
      ...comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies.filter((reply) => reply.id !== replyId),
            ],
          };
        } else {
          return comment;
        }
      }),
    ]);
  };

  const value = {
    comments,
    setComments,
    currentUser,
    addComment,
    deleteComment,
    editComment,
    replyToComment,
    editReply,
    deleteReply,
    voteCommentUp,
    voteCommentDown,
    voteReplyUp,
    voteReplyDown,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
