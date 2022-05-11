import { authFeatures } from "../Constant/constant";
const { SET_AUTH, CLEAR_AUTH } = authFeatures;

const authReducer = (prevState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...prevState, ...action.payload };
    case CLEAR_AUTH:
      return {
        isAuthenticated: false,
        token: null,
        userInfo: null,
      };
    default:
      return prevState;
  }
};

export { authReducer };
