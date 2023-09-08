import axios from 'axios';
import queryString from 'query-string';
import { DepositInterface, DepositGetQueryInterface } from 'interfaces/deposit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDeposits = async (query?: DepositGetQueryInterface): Promise<PaginatedInterface<DepositInterface>> => {
  const response = await axios.get('/api/deposits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDeposit = async (deposit: DepositInterface) => {
  const response = await axios.post('/api/deposits', deposit);
  return response.data;
};

export const updateDepositById = async (id: string, deposit: DepositInterface) => {
  const response = await axios.put(`/api/deposits/${id}`, deposit);
  return response.data;
};

export const getDepositById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/deposits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDepositById = async (id: string) => {
  const response = await axios.delete(`/api/deposits/${id}`);
  return response.data;
};
