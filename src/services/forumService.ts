import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Tipos
export interface Forum {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
  status: string;
  creationDate: string;
  editDate?: string;
  voteCount: number;
  userName: string;
  userId: string;
  tags: Tag[];
  comments: Comment[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  codeSnippet?: string;
  userName: string;
  userId: string;
}

// Serviço para listar fóruns com filtros
export const fetchForums = async (
  filters: Array<{ column: string; filterType: string; value: string }>,
  page = 0,
  size = 10
): Promise<{ content: Forum[]; totalPages: number; totalElements: number }> => {
  try {
    const response = await axios.post(
      `${API_URL}forum/filter?page=${page}&size=${size}`,
      filters
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao buscar fóruns");
    }
    throw new Error("Erro inesperado ao buscar fóruns");
  }
};

// Serviço para criar uma nova pergunta
export const createForum = async (forumData: {
  title: string;
  description: string;
  codeSnippet?: string;
  tagIds: string[];
  status: string;
  userId: string;
}): Promise<void> => {
  try {
    await axios.post(`${API_URL}forum/create`, forumData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao criar fórum");
    }
    throw new Error("Erro inesperado ao criar fórum");
  }
};

// Serviço para buscar detalhes de uma postagem
export const fetchPostDetails = async (postId: string): Promise<Forum> => {
  try {
    const response = await axios.get(`${API_URL}forum/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao buscar detalhes da postagem");
    }
    throw new Error("Erro inesperado ao buscar detalhes da postagem");
  }
};

// Serviço para criar um comentário
export const createComment = async (commentData: {
  forumId: string;
  userId: string;
  content: string;
  codeSnippet?: string;
}): Promise<void> => {
  try {
    await axios.post(`${API_URL}forum/${commentData.forumId}/comments`, commentData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao adicionar comentário");
    }
    throw new Error("Erro inesperado ao adicionar comentário");
  }
};


// Serviço para criar uma nova tag
export const createTag = async (tagData: { name: string }): Promise<void> => {
  try {
    await axios.post(`${API_URL}forum/tags`, tagData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao criar a tag");
    }
    throw new Error("Erro inesperado ao criar a tag");
  }
};

// Serviço para listar tags
export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await axios.get(`${API_URL}forum/tags`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao buscar as tags");
    }
    throw new Error("Erro inesperado ao buscar as tags");
  }
};

// Serviço para deletar perguntas
export const deleteForum = async (forumIds: string[]): Promise<void> => {
  try {
    await axios.delete(`${API_URL}forum/delete`, {
      data: forumIds,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao deletar pergunta");
    }
    throw new Error("Erro inesperado ao deletar pergunta");
  }
};

export const updateForum = async (forumData: {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
}): Promise<void> => {
  try {
    await axios.put(`${API_URL}forum/update`, forumData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "Erro ao atualizar o fórum");
    }
    throw new Error("Erro inesperado ao atualizar o fórum");
  }
};
