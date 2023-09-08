import { ProfitInterface } from 'interfaces/profit';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DepositInterface {
  id?: string;
  amount: number;
  currency: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  profit?: ProfitInterface[];
  user?: UserInterface;
  _count?: {
    profit?: number;
  };
}

export interface DepositGetQueryInterface extends GetQueryInterface {
  id?: string;
  currency?: string;
  user_id?: string;
}
