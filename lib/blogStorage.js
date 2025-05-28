const STORAGE_KEY = "blogsphere_blogs";

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function fetchBlogs() {
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

export function fetchBlogById(id) {
  const blogs = fetchBlogs();
  return blogs.find(blog => blog.id === id) || null;
}

export function addBlog(blogData) {
  const blogs = fetchBlogs();
  
  const newBlog = {
    ...blogData,
    id: generateId(),
  };
  
  const updatedBlogs = [newBlog, ...blogs];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  
  return newBlog;
}

export function updateBlog(id, blogData) {
  const blogs = fetchBlogs();
  const index = blogs.findIndex(blog => blog.id === id);
  
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...blogData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return blogs[index];
  }
  
  return null;
}