import { CommentForum } from "./CommentForum";

export interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
    comments: CommentForum[];
  }