import validator from "validator";

export default validateLogin = (email, password, firstName, lastName) => {
  if ((!email || email == "") && validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  } else if (!password) {
    throw new Error("Please enter a password");
  }
  if (firstName && firstName.length < 2 && lastName && lastName.length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }
};
