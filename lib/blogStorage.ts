import { Blog } from "./types";

const STORAGE_KEY = "blogsphere_blogs";

// Generate a unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Fetch all blogs from localStorage
export function fetchBlogs(): Blog[] {
  if (typeof window === "undefined") {
    return [];
  }
  
  try {
    const storedBlogs = localStorage.getItem(STORAGE_KEY);
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  } catch (error) {
    console.error("Error fetching blogs from localStorage:", error);
    return [];
  }
}

// Fetch a single blog by ID
export function fetchBlogById(id: string): Blog | null {
  const blogs = fetchBlogs();
  return blogs.find(blog => blog.id === id) || null;
}

// Add a new blog to localStorage
export function addBlog(blogData: Omit<Blog, "id">): Blog {
  const blogs = fetchBlogs();
  
  const newBlog: Blog = {
    ...blogData,
    id: generateId(),
  };
  
  const updatedBlogs = [newBlog, ...blogs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  
  return newBlog;
}