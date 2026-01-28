export interface UploadResponse {
  success: boolean;
  message: string;
  url?: string;
  fileName?: string;
}

export const uploadApi = {
  /**
   * Upload image to local storage
   * @param file - File to upload
   * @param slug - Folder name (products, banners, news, etc.)
   */
  uploadImage: async (file: File, slug: string = "images"): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return response.json();
  },
};