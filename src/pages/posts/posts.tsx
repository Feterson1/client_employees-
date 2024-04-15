import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postApi"
import { CreatePostComponent } from "../../components/create-post/createPost"
import { Card } from "../../components/card/card"

export const PostsPage = () => {
  const { data } = useGetAllPostsQuery()
  console.log(data)
  return (
    <>
      <div className="mb-10 w-full">
        <CreatePostComponent />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}
