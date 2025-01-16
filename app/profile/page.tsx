"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import { Post } from '@components/PromptCard';


const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

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
  const handleEdit = (post:Post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post:Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE',
        })
        
        const filteredPosts = posts.filter((p: Post) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error); 
      }
    }
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
