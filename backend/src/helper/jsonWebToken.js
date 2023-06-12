var jwt = require("jsonwebtoken");

const creatJsonWebToken = (payload, secrectKey, expiresIn) => {
  if (typeof payload !== "object" || !payload)
    throw new Error("Payload must be an object");
  if (typeof secrectKey !== "string" || !secrectKey)
    throw new Error("Secrect key must be a string");
  if (typeof expiresIn !== "string" || !expiresIn)
    throw new Error("Expires in must be a string");

  try {
    const token = jwt.sign(payload, secrectKey, {
      expiresIn,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = { creatJsonWebToken };
