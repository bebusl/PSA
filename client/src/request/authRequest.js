import requests from "./request";

const request = requests;

export const login = () => {
  request.get({ url: "/auth/login" });
};
export const logout = () => {
  request.get({ url: "/auth/logout" });
};

export const register = () => {
  request.post({ url: "/auth/register" });
};

export const getStatus = (callback) => {
  request.get({ url: "/auth/status", callback });
};
