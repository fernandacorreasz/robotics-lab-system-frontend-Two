// services/CertificateService.ts

import axios from "axios";
import { Certificate } from "../models/CertificateModel";

const API_URL = import.meta.env.VITE_API_URL;

// Função para buscar a lista de certificados com paginação
export const fetchCertificates = async (page: number, size: number): Promise<{ content: Certificate[], totalPages: number }> => {
  const response = await axios.get(`${API_URL}certificates/list?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// Função para gerar o certificado
export const generateCertificate = async (certificateId: string): Promise<void> => {
  await axios.post(`${API_URL}certificates/${certificateId}/generate`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
