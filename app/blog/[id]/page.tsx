"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/lib/types";
import { fetchBlogById } from "@/lib/blogStorage";
import { formatDate } from "@/lib/utils";

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const blogId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundBlog = fetchBlogById(blogId);
      
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        // Blog not found, redirect to home
        router.push("/");
      }
      
      setIsLoading(false);
    }
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return null; // This shouldn't happen as we redirect, but just in case
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
        
        <article className="bg-card rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex items-center text-muted-foreground mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {blog.content.split("\n").map((paragraph, index) => (
              paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}