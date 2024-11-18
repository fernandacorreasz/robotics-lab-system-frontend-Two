import axios from 'axios';
import { Activity } from '../models/Activity';
import { ActivityView } from '../models/ActivityView';

const API_URL = import.meta.env.VITE_API_URL;

// Função para buscar atividades de um usuário específico
export const fetchActivitiesByUserId = async (userId: string): Promise<Activity[]> => {
  try {
    const response = await axios.get<{ content: Activity[] }>(
      `${API_URL}activities/all/${userId}?page=0&size=100`, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao buscar atividades');
    } else {
      throw new Error('Ocorreu um erro inesperado ao buscar atividades');
    }
  }
};

// Função para buscar uma atividade específica
export const fetchActivityById = async (activityId: string): Promise<Activity> => {
  try {
    const response = await axios.get<Activity>(
      `${API_URL}activities/${activityId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao buscar atividade');
    } else {
      throw new Error('Ocorreu um erro inesperado ao buscar atividade');
    }
  }
};
// Função para buscar a foto da atividade
export const fetchActivityPhoto = async (activityId: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}activities/${activityId}/photo`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || 'Erro ao buscar foto da atividade');
    } else {
      throw new Error('Ocorreu um erro inesperado ao buscar foto da atividade');
    }
  }};
  
  export const fetchActivityWithCommentsById = async (activityId: string): Promise<ActivityView> => {
    try {
      const response = await axios.get<ActivityView>(
        `${API_URL}activities/${activityId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao buscar atividade com comentários');
      } else {
        throw new Error('Ocorreu um erro inesperado ao buscar atividade com comentários');
      }
    }
  };

  export const addCommentToActivity = async (activityId: string, text: string): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_URL}activities/${activityId}/comments`,
        null, // sem payload no body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: { text },
        }
      );
  
      if (response.status === 200) {
        console.log("Comentário adicionado com sucesso!");
      } else {
        throw new Error("Erro ao adicionar comentário");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao adicionar comentário');
      } else {
        throw new Error('Ocorreu um erro inesperado ao adicionar comentário');
      }
    }
  };

  export const createActivity = async (activityData: Activity, file?: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("activity", JSON.stringify(activityData));
      
      if (file) {
        formData.append("files", file);
      }
  
      const response = await axios.post(`${API_URL}activities`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        console.log("Atividade criada com sucesso!");
      } else {
        throw new Error("Erro ao criar atividade");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Erro ao criar atividade');
      } else {
        throw new Error('Ocorreu um erro inesperado ao criar atividade');
      }
    }
  };