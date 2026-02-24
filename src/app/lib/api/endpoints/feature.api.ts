import { Feature } from "@/app/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
}

// Pattern giống bannerApi
export const featureApi = {
  getAllNoPaging: async (): Promise<Feature[]> => {
    const res = await fetch(`${API_BASE}/api/feature/get-all`);
    if (!res.ok) throw new Error("Failed to fetch features");
    return res.json();
  },

  getById: async (id: number): Promise<Feature> => {
    const res = await fetch(`${API_BASE}/api/feature/get/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch feature");
    return res.json();
  },

  create: async (data: Partial<Feature>): Promise<Feature> => {
    const res = await fetch(`${API_BASE}/api/feature/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create feature");
    return res.json();
  },

  update: async (data: Feature): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/feature/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update feature");
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/feature/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to delete feature");
  },
};