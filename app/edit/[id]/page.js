"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import BlogForm from "@/components/BlogForm";
import { fetchBlogById, updateBlog } from "@/lib/blogStorage";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      const blogId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundBlog = fetchBlogById(blogId);
      
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        router.push("/");
      }
    }
  }, [params.id, router]);

  const handleSubmit = (updatedBlog) => {
    setIsSubmitting(true);
    
    updateBlog(blog.id, updatedBlog);
    
    window.dispatchEvent(new Event("storage"));
    
    router.push("/");
  };

  if (!blog) {
    return null;
  }

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
          <h2 className="text-2xl font-semibold mb-6">Edit Blog</h2>
          <BlogForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            initialData={blog}
          />
        </div>
      </div>
    </main>
  );
}