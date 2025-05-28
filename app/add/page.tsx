"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BlogForm from "@/components/BlogForm";
import { Blog } from "@/lib/types";
import { addBlog } from "@/lib/blogStorage";

export default function AddBlog() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (blog: Omit<Blog, "id">) => {
    setIsSubmitting(true);
    
    // Add the blog to storage
    addBlog(blog);
    
    // Trigger storage event to update other tabs
    window.dispatchEvent(new Event("storage"));
    
    // Redirect to home page
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to blogs
          </Link>
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold text-primary">BlogSphere</h1>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Create New Blog</h2>
          <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </main>
  );
}