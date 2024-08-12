import bcrypt from "bcryptjs";

export const handler = async (event) => {
  const numRounds = 8;

  const password = event.password;
  const hashPassword = await bcrypt.hash(password, numRounds);

  const response = {
    status: 200,
    body: JSON.stringify("Hashed Password : " + hashPassword),
  };
  return response;
};
