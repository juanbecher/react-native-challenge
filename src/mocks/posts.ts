import { Post } from "@/src/api/posts";

export const mockPosts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    userId: 1,
    publishedAt: "04/02/2023 13:26:21",
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content 2",
    userId: 2,
    publishedAt: "04/02/2023 13:25:21",
  },
];

export const mockPost = mockPosts[0];
