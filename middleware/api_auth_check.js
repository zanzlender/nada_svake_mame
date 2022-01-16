const userIsAuthenticated = (handler) => {
  return async (request, response) => {
    const header = request.headers.nsm_auth_token;

    // User not authenticated
    if (header !== "authorized") {
      return response.status(401).json({
        message: "UNAUTHORIZED_ACCESS",
      });
    }
    return handler(request, response);
  };
};

export default userIsAuthenticated;
