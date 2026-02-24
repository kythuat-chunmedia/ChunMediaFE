import {
  ContactRequestListItem,
  ContactRequestDetail,
  ContactRequestFilter,
  ContactDashboard,
  PagedResult,
  UpdateContactStatusBody,
} from "@/app/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
}

export const contactRequestApi = {
  getAll: async (
    filter: ContactRequestFilter
  ): Promise<PagedResult<ContactRequestListItem>> => {
    const params = new URLSearchParams();
    if (filter.search) params.append("search", filter.search);
    if (filter.status !== undefined && filter.status !== -1)
      params.append("status", filter.status.toString());
    if (filter.websiteType !== undefined && filter.websiteType !== -1)
      params.append("websiteType", filter.websiteType.toString());
    if (filter.budget !== undefined && filter.budget !== -1)
      params.append("budget", filter.budget.toString());
    if (filter.fromDate) params.append("fromDate", filter.fromDate);
    if (filter.toDate) params.append("toDate", filter.toDate);
    params.append("page", filter.page.toString());
    params.append("pageSize", filter.pageSize.toString());
    params.append("sortBy", filter.sortBy);
    params.append("sortDesc", filter.sortDesc.toString());

    const res = await fetch(
      `${API_BASE}/api/contact-request/get-all?${params}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (!res.ok) throw new Error("Failed to fetch contact requests");
    return res.json();
  },

  getById: async (id: string): Promise<ContactRequestDetail> => {
    const res = await fetch(
      `${API_BASE}/api/contact-request/get/${id}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (!res.ok) throw new Error("Failed to fetch contact request detail");
    return res.json();
  },

  updateStatus: async (
    id: string,
    body: UpdateContactStatusBody
  ): Promise<void> => {
    const res = await fetch(
      `${API_BASE}/api/contact-request/update-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) throw new Error("Failed to update status");
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(
      `${API_BASE}/api/contact-request/delete/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    if (!res.ok) throw new Error("Failed to delete contact request");
  },

  getDashboard: async (): Promise<ContactDashboard> => {
    const res = await fetch(
      `${API_BASE}/api/contact-request/dashboard`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (!res.ok) throw new Error("Failed to fetch dashboard");
    return res.json();
  },
};