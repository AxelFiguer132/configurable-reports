import { api } from './api';

export interface CreateReportPayload {
  id: string;
  name: string;
  type: 'empresa' | 'pais';
  conditions?: {
    id: number;
    tipo: string;
    valor: string;
    operador: string;
    condicion: string;
  }[];
}

export const createReport = async (data: CreateReportPayload) => {
  const response = await api.post('/', data);
  return response.data;
};

export const getReportById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
