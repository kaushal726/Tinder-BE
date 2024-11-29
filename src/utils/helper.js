import validator from "validator";


const validateFields = [
  {
    fields: "LOGIN",
    checkFields: ["emailId", "password"],
  },
  {
    fields: "SIGNUP",
    checkFields: [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "age",
      "about",
    ],
  },
  {
    fields: "FORGET_PASSWORD",
    checkFields: ["password"],
  },
  {
    fields: "PROFILE_EDIT",
    checkFields: ["password"],
  },
  {
    fields: "EDIT_PROFILE",
    checkFields: [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ],
  },
];

export const customValidators = (req, fields) => {
  const isValid = validateFields.some(
    (field) =>
      field.fields.includes(fields) &&
      field.checkFields.every((checkField) => req.body[checkField] !== "")
  );
  return isValid;
};

export const authSignUp = async (req, field) => {
  const { firstName, lastName, emailId, password, age, about, gender, photoUrl, skill } = req.body;
  if (!firstName && !lastName && !password && !emailId) {
    return false
  }
  if (!validator.isEmail(emailId)) {
    return false
  }
  if (!validator.isURL(photoUrl)) {
    return false
  }
  return true
}

export const authLogin = async (req, field) => {
  const { emailId, password } = req.body;
  if (!password && !emailId) {
    return false
  }
  if (!validator.isEmail(emailId)) {
    return false
  }
  return true
}

export const createResponse = (
  res,
  statusCode,
  message,
  data = null,
  error = null
) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
    error,
  });
};
