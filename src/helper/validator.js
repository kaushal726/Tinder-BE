export const signupValidator = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        throw new Error("Enter all required fields")
    }
}