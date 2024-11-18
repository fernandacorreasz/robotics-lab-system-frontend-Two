import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  permissionLevel: number;
  name: string;
  userId: string;
}

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}auth/login`, loginData);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('permissionLevel', response.data.permissionLevel.toString());
    localStorage.setItem('name', response.data.name); 
    localStorage.setItem('userId', response.data.userId); 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao realizar login');
    } else {
      throw new Error('Ocorreu um erro inesperado');
    }
  }
};
