import { Album } from "../types/types";

export async function getDailyItem(): Promise<Album | null> {
  try {
    const response = await fetch(
      "https://albumdlebackend-production.up.railway.app/daily-item"
    );

    console.log("Response Status:", response.status);
    console.log("Response URL:", response.url);

    // Check the content type and log the raw response body
    const rawResponse = await response.text(); // get raw response as text
    console.log("Raw Response Body:", rawResponse);

    if (!response.ok) {
      throw new Error(`Failed to fetch daily item: ${response.statusText}`);
    }

    const data = JSON.parse(rawResponse); // manually parse response
    console.log("Parsed Data:", data);
    return data.item;
  } catch (error) {
    console.error("Error fetching daily item:", error);
    return null;
  }
}

export async function getAllItems(): Promise<Album[]> {
  try {
    const response = await fetch(
      "https://albumdlebackend-production.up.railway.app/all-items"
    );

    const text = await response.text(); // Get raw response
    console.log("Raw Response:", text); // Log raw response for debugging

    if (!response.ok)
      throw new Error(`Failed to fetch items: ${response.statusText}`);

    const data = JSON.parse(text); // Parse JSON manually
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
