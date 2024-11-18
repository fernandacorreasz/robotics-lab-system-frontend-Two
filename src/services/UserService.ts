// services/UserService.ts
import axios from 'axios';
import { PaginatedUserResponse } from '../models/User';


const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (
  page: number,
  size: number,
  selectedFilter?: string | null,
  filterValue?: string | null
): Promise<PaginatedUserResponse> => {
  try {
    const response = await axios.get<PaginatedUserResponse>(`${API_URL}user/list`, {
      params: { page, size, selectedFilter, filterValue },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao buscar usuários');
    } else {
      throw new Error('Ocorreu um erro inesperado ao buscar usuários');
    }
  }
};


export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  roles: string[];
}): Promise<void> => {
  try {
    await axios.post(`${API_URL}auth/register`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao registrar usuário');
    } else {
      throw new Error('Ocorreu um erro inesperado ao registrar o usuário');
    }
  }
};
