export interface Post {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  userId: number;
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchPostById(id: number): Promise<Post> {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/posts/${id}`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
