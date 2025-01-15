"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // Provide function implementations for handleEdit and handleDelete
  const handleEdit = () => {
    
  };

  const handleDelete = () => {
    
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
