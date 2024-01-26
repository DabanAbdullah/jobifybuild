import { NotFoundError, UnauthenticatedError } from "../errors/customError.js";
import Users from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { hashpassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const Register = async (req, res) => {
  const isFirstAccount = (await Users.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const pass = await hashpassword(req.body.password);
  req.body.password = pass;
  const user = await Users.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User Created" });
};

const oneDay = 1000 * 60 * 60 * 24;

export const Login = async (req, res) => {
  // const hashedpassword = await hashpassword(req.body.password);
  const user = await Users.findOne({
    email: req.body.email,
  });
  const validuser =
    user && (await comparePassword(req.body.password, user.password));

  if (!validuser) throw new UnauthenticatedError("invalid credentials");

  const JWT = createJWT({ userId: user._id, role: user.role });

  res.cookie("token", JWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
