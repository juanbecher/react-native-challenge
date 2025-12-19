export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`);
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
