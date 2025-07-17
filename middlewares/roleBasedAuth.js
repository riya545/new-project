function  authorizeRoles(...allowedRoles) {
    return (req, res ,next) => {
      const user = (req).user; // assuming req.user is set by auth middleware
      console.log("Role based middleware");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: No user info" });
      }

      if (!allowedRoles.includes(user.scope)) {
        return res.status(403).json({
          message: 'Access denied: Your role does not permit access to this resource.'
        });
      }

      next();
    };
  }

export default {authorizeRoles};
