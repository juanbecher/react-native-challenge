export interface Post {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/posts`;

    const response = await fetch(url);

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
      `${process.env.EXPO_PUBLIC_API_URL}/posts/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
