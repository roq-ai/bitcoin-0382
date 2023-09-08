import * as yup from 'yup';

export const miningValidationSchema = yup.object().shape({
  mining_date: yup.date().required(),
  profit_id: yup.string().nullable().required(),
});
