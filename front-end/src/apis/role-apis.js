import {
  deleteMethodCall,
  getMethodCall,
  postMethodCall,
  putMethodCall,
} from "./api-handler";
const baseUrl = "http://localhost:4000";

export const getRolesApi = async () => {
  return await getMethodCall(`${baseUrl}/roles`);
};

export const addRoleApi = async (roleData) => {
  return await postMethodCall(`${baseUrl}/add-role`, roleData);
};

export const updateRoleApi = async (roleData) => {
  console.log({ roleData });
  return await putMethodCall(`${baseUrl}/update-role`, roleData);
};

export const getRoleById = async (id) => {
  return await getMethodCall(`${baseUrl}/role/${id}`);
};

export const deleteRoleById = async (id) => {
  return await deleteMethodCall(`${baseUrl}/delete-role/${id}`);
};
