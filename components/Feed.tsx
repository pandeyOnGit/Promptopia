"use client";
import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";

interface Creator {
  _id: string;
  name: string;
  image: string;
  username: string; // Add username
  email: string;    // Add email
}

interface Post {
  _id: string;
  prompt: string;
  tag: string;
  creator: Creator;
}

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        // Use post.id as the key, or fall back to the index if id is missing
        <PromptCard key={post._id || index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  // Handle search change and filter posts
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search text
  const filteredPosts = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      post.creator.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={(tag) => console.log("Tag clicked:", tag)} />
    </section>
  );
};

export default Feed;
