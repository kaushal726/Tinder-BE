export const isAdminAuth = (req, res, next) => {
    let token = "xyz"
    if (token == 'xyz') {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export const isUserAuth = (req, res) => {
    let token = "xyz";
    if (token == "xyz") {
        res.status(200).json({
            isUserAuth: true
        });
    }
}