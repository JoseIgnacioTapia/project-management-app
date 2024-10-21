import jwt from 'jsonwebtoken';

export const generateJWT = async (
  uid: string,
  name: string,
  role: string
): Promise<string> => {
  const payload = { uid, name, role };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY || 'defaultSecretKey',
      { expiresIn: '2h' },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
