import { Comment } from "../types"
import { api } from "./api"

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    CreateComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: "/comment",
        method: "POST",
        body: newComment,
      }),
    }),
    DeleteComment: builder.mutation<void, string>({
      query: commentId => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi

export const {
  endpoints: { CreateComment, DeleteComment },
} = commentApi
