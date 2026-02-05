// ============ MEMBER TEAM ============
export interface MemberTeam {
    id: number;
    image: string;
    name: string;
    description?: string | null;
    role: string;
    createdAt: string;
}

// Form data để tạo / sửa member team
export interface MemberTeamFormData {
    image: string;
    name: string;
    description?: string;
    role: string;
}

// Filter params cho API
export interface MemberTeamFilterParams {
    page?: number;
    pageSize?: number;
    search?: string;      // tìm theo name
    role?: string;        // lọc theo role
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
