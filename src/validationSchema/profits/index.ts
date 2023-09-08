import * as yup from 'yup';

export const profitValidationSchema = yup.object().shape({
  percentage_gain: yup.number().required(),
  deposit_id: yup.string().nullable().required(),
});
