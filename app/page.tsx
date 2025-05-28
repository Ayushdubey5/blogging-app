"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { Blog } from "@/lib/types";
import { fetchBlogs } from "@/lib/blogStorage";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    // Load blogs from localStorage
    const loadedBlogs = fetchBlogs();
    setBlogs(loadedBlogs);
    
    // Listen for storage events to update the blog list in real-time
    const handleStorageChange = () => {
      setBlogs(fetchBlogs());
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-4xl font-bold text-primary">BlogSphere</h1>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mb-6">
            A simple & clean platform for sharing your thoughts and ideas with the world.
          </p>
          <Link 
            href="/add" 
            className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-semibold mb-3">No blogs yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start by adding your first blog post to see it appear here.
            </p>
            <Link 
              href="/add" 
              className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              <Plus className="h-5 w-5 mr-2" />
              Write Your First Blog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}