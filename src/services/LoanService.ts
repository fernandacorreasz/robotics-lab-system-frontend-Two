import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
  
  
  //Serviço de Aprovação de Empréstimos
  export const approveLoan = async (loanData: {
    loanId: string;
    status: string;
    authorizedQuantity: number;
    authorizerEmail: string;
  }) => {
    try {
      await axios.put(`${API_URL}loans/request`, loanData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao aprovar empréstimo');
      } else {
        throw new Error('Erro inesperado ao aprovar empréstimo');
      }
    }
  };
  
  //Serviço de Confirmação de Retirada
  export const confirmPickup = async (loanId: string, userEmail: string) => {
    try {
      await axios.put(
        `${API_URL}loans/pickup`,
        {},
        {
          params: { loanId, userEmail },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao confirmar retirada');
      } else {
        throw new Error('Erro inesperado ao confirmar retirada');
      }
    }
  };
  
  // Serviço atualizado para listar componentes com detalhes
export const fetchComponents = async (page = 0, size = 10) => {
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
  