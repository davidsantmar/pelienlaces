import authActionTypes from "../actions/authActionTypes";

function authReducer(auth = {}, action) {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        isAuthenticated: true,
        ...action.data,
      };

    case authActionTypes.LOGOUT:
      return {
        isAuthenticated: false,
      };

    default:
      return auth;
  }
}

export default authReducer;
