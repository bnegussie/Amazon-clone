// Making sure the required textboxes are not empty and 
// that the user has provided a valid email address.

module.exports = (req, res, next) => {
    
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/create-account") {
        const {userName, email, pwd} = req.body;

        if (![userName, email, pwd].every(Boolean)) {
            return res.status(401).json("Missing required information.");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email.");
        }
    } else if (req.path === "/sign-in") {
        const {email, pwd} = req.body;

        if (![email, pwd].every(Boolean)) {
            return res.status(401).json("Missing required information.");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email.");
        }
    }
  
    next();
};
