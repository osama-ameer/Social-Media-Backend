  const checkRole = (role) => (req, res, next) => {

    // console.log("Reuired role: ",role);
    // console.log("Request user role: ",req.user.role);

    // Check if the required role for this role and req.user.role(user logged in, tring to make this request) doest not match then return:
    if(role != req.user.role) return res.status(401).json({ msg: "You are not allowed to make this request." })

    // if the role matches, then move forward to API
    next()

  };

  
  module.exports = checkRole;
  