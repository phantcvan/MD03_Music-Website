const checkIsEmpty = (field) => {
    if (field === undefined || field === null || field === "") return true;
    else return false;
}


const validateData = (req, res, next) => {
    const { Content, Due_date, Status, User_name } = req.body;
    if (checkIsEmpty(Content)||checkIsEmpty(Due_date)||checkIsEmpty(Status)||checkIsEmpty(User_name)) {
        return res.status(404).json({
            message: "Input blank"
        })
    }
    next();
}

module.exports = validateData;