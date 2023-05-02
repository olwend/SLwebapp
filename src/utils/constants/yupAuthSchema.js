import * as Yup from "yup";

export const yupRegistrationSchema = (props) => Yup.object().shape({
    name: Yup.string()
      .min(2, "Names must have at least 2 characters")
      .max(30, "Names can't be longer than 100 characters")
      .required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    tos: Yup.bool()
      .oneOf([true], "Agree to terms and conditions"),
  });

  export const yupLoginSchema = (props) => Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: Yup.string()
      .required('Password is required')
  });

  export const yupActivationSchema = (props) => Yup.object().shape({
    code: Yup.string()
      .required("An activation code is required")
  });

  export const yupForgotPasswordSchema = (props) => Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
  });

  export const yupForgotPasswordSubmitSchema = (props) => Yup.object().shape({
    code: Yup.string()
      .required("An activation code is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirmation: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  export const yupChangePasswordValidation = (props) => Yup.object().shape({
    oldPassword: Yup.string()
      .required("Current password is required"),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
      confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
