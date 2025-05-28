"use client";

import { useState } from "react";

export default function BlogForm({ onSubmit, isSubmitting, initialData = null }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    const summary = content.trim().slice(0, 150) + (content.length > 150 ? "..." : "");
    
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      summary,
      coverImage: coverImage.trim(),
      date: initialData?.date || new Date().toISOString(),
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
        <label htmlFor="coverImage" className="block text-sm font-medium">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Paste an image URL..."
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {coverImage && (
          <div className="mt-2 rounded-md overflow-hidden aspect-video">
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
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
        {isSubmitting ? "Publishing..." : initialData ? "Update Blog" : "Publish Blog"}
      </button>
    </form>
  );
}