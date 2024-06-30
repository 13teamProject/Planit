import ErrorMessages from '@/constants/errorMessage';
import * as yup from 'yup';

export const authValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ErrorMessages.EMAIL_REQUIRED)
    .matches(
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
      ErrorMessages.INVALID_EMAIL,
    ),
  password: yup
    .string() //
    .required(ErrorMessages.PASSWORD_REQUIRED)
    .min(8, ErrorMessages.INVALID_PASSWORD), //
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], ErrorMessages.PASSWORDS_MUST_MATCH)
    .required(ErrorMessages.CONFIRM_PASSWORD_REQUIRED)
    .optional(),
  nickname: yup
    .string()
    .required(ErrorMessages.NICKNAME_REQUIRED) //
    .optional(),
  terms: yup
    .boolean() //
    .oneOf([true])
    .required()
    .optional(),
});

export const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required(ErrorMessages.PASSWORD_REQUIRED)
    .min(8, ErrorMessages.INVALID_PASSWORD),
  newPassword: yup
    .string()
    .required(ErrorMessages.PASSWORD_REQUIRED)
    .min(8, ErrorMessages.INVALID_PASSWORD),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword')], ErrorMessages.PASSWORDS_MUST_MATCH)
    .required(ErrorMessages.CONFIRM_PASSWORD_REQUIRED),
});
