import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export const getTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}/getAllTodos`);
  return response.data;
};

export const addTodo = async (todo: { title: string; description: string }) => {
  const response = await axios.post(`${API_BASE_URL}/addTodo`, todo);
  return response.data;
};

export const updateTodo = async (id: string) => {
  const response = await axios.put(`${API_BASE_URL}/updateTodo/${id}`);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteTodo/${id}`);
  return response.data;
};
