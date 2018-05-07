import React from "react";

const GithubSash = ({ user, repo }) => (
  <a href={`https://github.com/${user}/${repo}`}>
    <img
      style={{ position: "absolute", top: 0, right: 0, border: 0 }}
      src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
      alt="Fork me on GitHub"
    />
  </a>
);

export default GithubSash;
