import {
  deleteMethodCall,
  getMethodCall,
  postMethodCall,
  putMethodCall,
} from "./api-handler";
const baseUrl = "http://localhost:4000";

export const getUsersApi = async () => {
  return await getMethodCall(`${baseUrl}/users`);
};

export const userLoginApi = async (userData) => {
  return await postMethodCall(`${baseUrl}/login`, userData);
};

export const updateUserApi = async (userData) => {
  return await putMethodCall(`${baseUrl}/update-user`, userData);
};

export const createUserApi = async (userData) => {
  return await postMethodCall(`${baseUrl}/add-user`, userData);
};

export const getUserById = async (id) => {
  return await getMethodCall(`${baseUrl}/user/${id}`);
};

export const deleteUserById = async (id) => {
  return await deleteMethodCall(`${baseUrl}/delete-user/${id}`);
};
