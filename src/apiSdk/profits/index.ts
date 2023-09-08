import axios from 'axios';
import queryString from 'query-string';
import { ProfitInterface, ProfitGetQueryInterface } from 'interfaces/profit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProfits = async (query?: ProfitGetQueryInterface): Promise<PaginatedInterface<ProfitInterface>> => {
  const response = await axios.get('/api/profits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProfit = async (profit: ProfitInterface) => {
  const response = await axios.post('/api/profits', profit);
  return response.data;
};

export const updateProfitById = async (id: string, profit: ProfitInterface) => {
  const response = await axios.put(`/api/profits/${id}`, profit);
  return response.data;
};

export const getProfitById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/profits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProfitById = async (id: string) => {
  const response = await axios.delete(`/api/profits/${id}`);
  return response.data;
};
