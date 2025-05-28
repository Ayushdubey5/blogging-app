"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { fetchBlogs, updateBlog } from "@/lib/blogStorage";

export default function Home() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  
  useEffect(() => {
    const loadedBlogs = fetchBlogs();
    setBlogs(loadedBlogs);
    setFilteredBlogs(loadedBlogs);
    
    const handleStorageChange = () => {
      const updatedBlogs = fetchBlogs();
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  const handleEdit = (blog) => {
    router.push(`/edit/${blog.id}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onSearch={handleSearch} />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Blogsphere</h1>
        
        {/* Mobile Add New Blog Button */}
        <h4 className="text-2xl  mb-4 text-center">Welcome to My Blog</h4>
        
        {/* Mobile Add New Blog Button */}
        <div className="flex flex-col items-center mb-12">
          <p className="text-muted-foreground text-center max-w-2xl mb-6">
            A simple & clean platform for sharing your thoughts and ideas with the world.
          </p>
          <Link 
            href="/add" 
            className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity md:hidden"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Blog
          </Link>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-semibold mb-3">No blogs found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {blogs.length === 0 
                ? "Start by adding your first blog post to see it appear here."
                : "No blogs match your search criteria."}
            </p>
            {blogs.length === 0 && (
              <Link 
                href="/add" 
                className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write Your First Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}