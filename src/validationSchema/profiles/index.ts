import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup.string().nullable(),
  location: yup.string().nullable(),
  website: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
