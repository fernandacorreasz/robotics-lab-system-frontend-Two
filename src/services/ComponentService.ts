import axios from 'axios';
import { Component } from '../models/Component';
import { Category } from '../models/Category';
import { ComponentUpload } from '../models/ComponentUpload';

const API_URL = import.meta.env.VITE_API_URL;

interface PaginatedComponents {
  content: Component[];
  totalElements: number;
  totalPages: number;
}

export const fetchComponents = async (page: number, size: number): Promise<PaginatedComponents> => {
  try {
    const response = await axios.get<PaginatedComponents>(`${API_URL}components/all-with-associations?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch {
    throw new Error('Erro ao buscar componentes');
  }
};

interface UploadCSVError {
    identifier: string;
    errorMessage: string;
  }
  
  export const uploadComponentsCSV = async (csvContent: string): Promise<UploadCSVError[]> => {
    try {
      const response = await axios.post<UploadCSVError[]>(`${API_URL}components/bulk-upload`, csvContent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'text/plain',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return error.response.data as UploadCSVError[];
      }
      throw new Error('Erro ao realizar o upload do arquivo CSV');
    }
  };
  

export const uploadComponentsJSON = async (components: ComponentUpload[]): Promise<void> => {
    try {
      await axios.post(`${API_URL}components/bulk-upload-json`, components, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      throw new Error('Erro ao realizar o upload dos componentes em JSON');
    }
  };
  
export const fetchCategoriesWithSubcategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}categories/with-subcategories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch {
    throw new Error('Erro ao buscar categorias com subcategorias');
  }
};

export const filterComponents = async (
  filters: { column: string; filterType: string; value: string }[],
  page: number,
  size: number,
): Promise<PaginatedComponents> => {
  try {
    const response = await axios.post<PaginatedComponents>(`${API_URL}components/filter?page=${page}&size=${size}`, filters, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch {
    throw new Error('Erro ao filtrar componentes');
  }
};


export const createCategory = async (categoryName: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}categories`, { categoryName }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      throw new Error('Erro ao criar categoria');
    }
  };
  
  export const createSubCategory = async (subCategoryName: string, categoryId: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}subcategories`, {
        subCategoryName,
        totalQuantity: 0,
        category: { id: categoryId },
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      throw new Error('Erro ao criar subcategoria');
    }
  };
  
  export const deleteComponent = async (serialNumbers: string[]): Promise<void> => {
    try {
      await axios.delete(`${API_URL}components/bulk-delete`, {
        data: serialNumbers,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      throw new Error('Erro ao deletar o componente.');
    }
  };

  export const updateComponent = async (
    id: string,
    updates: Partial<Component>
  ): Promise<void> => {
    try {
      await axios.put(`${API_URL}components/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch {
      throw new Error('Erro ao  atualizar o componente.');
    }
  };
  