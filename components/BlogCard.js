"use client";

import { motion } from "framer-motion";
import { Calendar, Edit } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ blog, onEdit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {blog.coverImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold line-clamp-2">{blog.title}</h2>
          <button
            onClick={() => onEdit(blog)}
            className="p-2 hover:bg-muted/50 rounded-full"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={blog.date}>{formatDate(blog.date)}</time>
        </div>
        
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {blog.summary}
        </p>
        
        <Link
          href={`/blog/${blog.id}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          Read more
        </Link>
      </div>
    </motion.div>
  );
}