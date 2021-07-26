export const LOGIN = "LOGIN",
  LOGOFF = "LOGOFF",
  UPDATE_USERDATA = "UPDATE_USERDATA",
  UPDATE_LIKEKEYWORD = "UPDATE_LIKEKEYWORD",
  UPDATE_HATEKEYWORD = "UPDATE_HATEKEYWORD";

export const login = (userData) => {
  return {
    type: LOGIN,
    userData,
  };
};

export const logoff = () => ({ type: LOGOFF });

export const updateUserdata = (userData) => {
  return {
    type: UPDATE_USERDATA,
    userData,
  };
};

export const updateLikeKeyword = (keywords) => {
  return {
    type: UPDATE_LIKEKEYWORD,
    keywords,
  };
};

export const updateHateKeyword = (keywords) => {
  return {
    type: UPDATE_HATEKEYWORD,
    keywords,
  };
};
