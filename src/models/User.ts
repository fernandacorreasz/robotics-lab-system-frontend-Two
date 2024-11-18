
export interface User {
    name: string;
    email: string;
    phoneNumber?: string | null;
    address?: string | null;
    roles: string[];
  }
  
  export interface PaginatedUserResponse {
    content: User[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }
  