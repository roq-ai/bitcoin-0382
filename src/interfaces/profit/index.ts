import { MiningInterface } from 'interfaces/mining';
import { DepositInterface } from 'interfaces/deposit';
import { GetQueryInterface } from 'interfaces';

export interface ProfitInterface {
  id?: string;
  percentage_gain: number;
  deposit_id: string;
  created_at?: any;
  updated_at?: any;
  mining?: MiningInterface[];
  deposit?: DepositInterface;
  _count?: {
    mining?: number;
  };
}

export interface ProfitGetQueryInterface extends GetQueryInterface {
  id?: string;
  deposit_id?: string;
}
