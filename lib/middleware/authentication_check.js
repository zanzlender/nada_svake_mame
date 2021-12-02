import { auth } from '../Firebase/firebase_admin';

export function withAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).end('Not authorized.');
    }

    const toke = authHeader.split(' ')[1];
    let decodedToken;

    try {
      decodedToken = await auth.verifyToken(token);
      if (!decodedToken || !decodedToken.uid) {
        return res.status(401).end('Not authenticated.');
      }
      req.uid = decodedToken.uid;
    } catch (err) {
      console.log(err.errorInfo);

      const errorCode = err.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }

      // TODO handle firebase errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}
