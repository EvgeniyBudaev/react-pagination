import React from "react";
import { IPost } from "./types";

interface IPosts {
  posts: IPost[];
}

const Posts: React.FC<IPosts> = ({ posts }) => {
  return (
    <ul className="list-group my-4">
      {posts.map((post, index) => {
        return (
          <li key={index} className="list-group-item">
            {post.title}
          </li>
        );
      })}
    </ul>
  );
};

export { Posts };
