import { useEffect, useState } from "react";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../services/studentApi";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  async function loadStudents() {
    const response = await getStudents();
    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleEdit(student) {
    setSelectedStudent(student);
  }

  async function handleAddStudent(student) {
    try {
      if (student.id) {
        await updateStudent(student.id, student);
      } else {
        await createStudent(student);
      }

      await loadStudents();
      setSelectedStudent(null);
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Something went wrong"
      );
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this student?"
    );

    if (!confirmed) return;

    await deleteStudent(id);
    await loadStudents();
  }

  const filteredStudents = students.filter((student) => {
    const term = search.toLowerCase();

    return (
      student.first_name.toLowerCase().includes(term) ||
      student.last_name.toLowerCase().includes(term) ||
      student.admission_number.toLowerCase().includes(term) ||
      student.course.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Student Management System
      </h1>

      <StudentForm
        onSubmit={handleAddStudent}
        selectedStudent={selectedStudent}
      />

      <input
        type="text"
        placeholder="Search Students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <StudentTable
        students={filteredStudents}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Dashboard;