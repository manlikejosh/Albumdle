import { Album } from "../types/types";

export async function getDailyItem(): Promise<Album | null> {
  try {
    const response = await fetch("http://localhost:3000/daily-item");
    if (!response.ok) throw new Error("Failed to fetch daily item");

    const data = await response.json();
    // console.log("Today's Item:", data.item);
    return data.item;
  } catch (error) {
    console.error("Error fetching daily item:", error);
    return null;
  }
}

export async function getAllItems(): Promise<Album[]> {
  try {
    const response = await fetch("http://localhost:3000/all-items");
    if (!response.ok) throw new Error("Failed to fetch items");

    const data = await response.json();
    // console.log("Full List:", data);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
