import authActionTypes from "./authActionTypes";

export function login() {
  return { type: authActionTypes.LOGIN };
}

export function logout() {
  return { type: authActionTypes.LOGOUT };
}