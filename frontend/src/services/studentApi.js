import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getStudents = () =>
  api.get("/students/");

export const createStudent = (student) =>
  api.post("/students/", student);

export const updateStudent = (id, student) =>
  api.put(`/students/${id}`, student);

export const deleteStudent = (id) =>
  api.delete(`/students/${id}`);