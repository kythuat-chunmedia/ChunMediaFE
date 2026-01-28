// ============================================================
// UTILITY TYPES
// ============================================================

// Form mode
export type FormMode = 'create' | 'edit' | 'view';

// Select option for dropdowns
export interface SelectOption {
  value: string | number;
  label: string;
}

// File upload response
export interface FileUploadResponse {
  success: boolean;
  message: string;
  url?: string;
  fileName?: string;
}
