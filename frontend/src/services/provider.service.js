import axios from "axios";

export const getProviders = async (page, size) => {
  const res = await axios.get(
    `http://localhost:3000/providers?page=${page}&limit=${size}`
  );
  return res.data;
};

export const createProvider = async (payload) => {
  const res = await axios.post(`http://localhost:3000/providers`, payload);
  return res.data;
};

export const deleteProvider = async (id) => {
  await axios.delete(`http://localhost:3000/providers/${id}`);
};
