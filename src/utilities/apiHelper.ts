import { Album } from "../types/types";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getDailyItem(): Promise<Album | null> {
  try {
    const response = await fetch(`${apiUrl}/daily-item`);

    // console.log("Response Status:", response.status);
    // console.log("Response URL:", response.url);

    // Check the content type and log the raw response body
    const rawResponse = await response.text(); // get raw response as text
    // console.log("Raw Response Body:", rawResponse);

    if (!response.ok) {
      throw new Error(`Failed to fetch daily item: ${response.statusText}`);
    }

    const data = JSON.parse(rawResponse); // manually parse response
    // console.log("Parsed Data:", data);
    return data.item;
  } catch (error) {
    console.error("Error fetching daily item:", error);
    return null;
  }
}

export async function getAllItems(): Promise<Album[]> {
  try {
    const response = await fetch(`${apiUrl}/all-items`);

    const text = await response.text();
    // console.log("Raw Response:", text);

    if (!response.ok)
      throw new Error(`Failed to fetch items: ${response.statusText}`);

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
