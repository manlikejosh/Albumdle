import { Album } from "../types/types";

export async function getDailyItem(): Promise<Album | null> {
  try {
    const response = await fetch(
      "https://albumdlebackend-production.up.railway.app/daily-item/"
    );

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
    const response = await fetch(
      "https://albumdlebackend-production.up.railway.app/all-items/"
    );
    if (!response.ok) throw new Error("Failed to fetch items");

    const data = await response.json();
    // console.log("Full List:", data);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
