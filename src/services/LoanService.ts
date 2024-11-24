import axios from 'axios';
import { Loan } from '../models/Loan';

const API_URL = import.meta.env.VITE_API_URL;
export const listLoans = async (page = 0, size = 10): Promise<{ content: Loan[] }> => {
  try {
    const response = await axios.get(`${API_URL}loans/all-inclusive`, {
      params: { page, size },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data;
      throw new Error(errorMessage);
    }
    throw new Error("Erro inesperado ao listar empréstimos.");
  }
};

export const authorizeLoan = async (loanData: {
  loanId: string;
  status: string;
  authorizedQuantity: number;
  authorizerEmail: string;
}) => {
  try {
    await axios.post(`${API_URL}loans/authorize`, loanData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data;
      throw new Error(errorMessage);
    }
  }
};

export const confirmLoanPickup = async (loanId: string, userEmail: string) => {
  try {
    await axios.put(
      `${API_URL}loans/pickup`,
      {},
      {
        params: { loanId, userEmail },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Erro ao confirmar retirada.";
      throw new Error(errorMessage);
    }
    throw new Error("Erro inesperado ao confirmar retirada.");
  }
};

//Serviço de Solicitação de Empréstimos
export const requestLoan = async (loanData: {
    componentName: string;
    quantity: number;
    expectedReturnDate: string;
    borrowerEmail: string;
  }) => {
    try {
      await axios.post(`${API_URL}loans/request`, loanData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao solicitar empréstimo');
      } else {
        throw new Error('Erro inesperado ao solicitar empréstimo');
      }
    }
  };
  
  

  // Serviço atualizado para listar componentes com detalhes
export const fetchComponentsLoad = async (page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_URL}loans/details`, {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao buscar componentes');
      } else {
        throw new Error('Erro inesperado ao buscar componentes');
      }
    }
  };
  
  export const fetchComponentDetails = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}components/${id}/with-associations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || "Erro ao buscar detalhes do componente");
      } else {
        throw new Error("Erro inesperado ao buscar detalhes do componente");
      }
    }
  };
  export const fetchAllLoans = async () => {
  try {
    const response = await axios.get(`${API_URL}loans/all-inclusive`, {
      params: { page: 0, size: 10 },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao listar empréstimos.");
    }
    throw new Error("Erro inesperado ao listar empréstimos.");
  }
};

export const returnLoan = async (loanData: {
  loanId: string;
  returnedQuantity: number;
  borrowerEmail: string;
}) => {
  try {
    await axios.post(`${API_URL}loans/return`, loanData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao registrar devolução.");
    }
    throw new Error("Erro inesperado ao registrar devolução.");
  }
};
