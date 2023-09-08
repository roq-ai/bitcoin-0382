import axios from 'axios';
import queryString from 'query-string';
import { MiningInterface, MiningGetQueryInterface } from 'interfaces/mining';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMinings = async (query?: MiningGetQueryInterface): Promise<PaginatedInterface<MiningInterface>> => {
  const response = await axios.get('/api/minings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMining = async (mining: MiningInterface) => {
  const response = await axios.post('/api/minings', mining);
  return response.data;
};

export const updateMiningById = async (id: string, mining: MiningInterface) => {
  const response = await axios.put(`/api/minings/${id}`, mining);
  return response.data;
};

export const getMiningById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/minings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMiningById = async (id: string) => {
  const response = await axios.delete(`/api/minings/${id}`);
  return response.data;
};
