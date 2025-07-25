function  authorizeRoles(...allowedRoles) {
    return (req, res ,next) => {
      const user = (req).user; // assuming req.user is set by auth middleware
      console.log(user.role)
      console.log("Role based middleware");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: No user info" });
      }
      console.log(allowedRoles)
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: 'Access denied: Your role does not permit access to this resource.'
        });
      }

      next();
    };
  }


module.exports={
    authorizeRoles

}
