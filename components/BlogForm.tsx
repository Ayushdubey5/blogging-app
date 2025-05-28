"use client";

import { useState } from "react";
import { Blog } from "@/lib/types";

interface BlogFormProps {
  onSubmit: (blog: Omit<Blog, "id">) => void;
  isSubmitting: boolean;
}

export default function BlogForm({ onSubmit, isSubmitting }: BlogFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    // Create a summary from the content (first 150 characters)
    const summary = content.trim().slice(0, 150) + (content.length > 150 ? "..." : "");
    
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      summary,
      date: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Blog Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a catchy title..."
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Blog Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          rows={10}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting || !title.trim() || !content.trim()}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Publishing..." : "Publish Blog"}
      </button>
    </form>
  );
}