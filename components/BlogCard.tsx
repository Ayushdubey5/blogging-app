"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/blog/${blog.id}`} className="block h-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
          
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </div>
          
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {blog.summary}
          </p>
          
          <span className="text-primary text-sm font-medium hover:underline">
            Read more
          </span>
        </div>
      </Link>
    </motion.div>
  );
}