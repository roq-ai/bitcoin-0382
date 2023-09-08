import { ProfitInterface } from 'interfaces/profit';
import { GetQueryInterface } from 'interfaces';

export interface MiningInterface {
  id?: string;
  mining_date: any;
  profit_id: string;
  created_at?: any;
  updated_at?: any;

  profit?: ProfitInterface;
  _count?: {};
}

export interface MiningGetQueryInterface extends GetQueryInterface {
  id?: string;
  profit_id?: string;
}
