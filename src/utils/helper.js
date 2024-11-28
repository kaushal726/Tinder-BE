const validateFields = [
  {
    fields: "LOGIN",
    checkFields: ["email", "password"],
  },
  {
    fields: "SIGNUP",
    checkFields: ["firstName", "lastName", "email", "password", "age", "about"],
  },
  {
    fields: "FORGET_PASSWORD",
    checkFields: ["password"],
  },
  {
    fields: "PROFILE_EDIT",
    checkFields: ["password"],
  },
];

const customValidators = (req, fields) => {
  const isValid = validateFields.some(
    (field) =>
      field.fields.includes(fields) &&
      field.checkFields.every((checkField) => req.body[checkField] != "")
  );
  return isValid;
};

const createResponse = (
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

const objExport = {
  customValidators: customValidators,
  createResponse: createResponse,
};
