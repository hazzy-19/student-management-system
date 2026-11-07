import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "./services/studentApi";

function App() {
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  function handleEdit(student){
    setSelectedStudent(student);
  }

  async function loadStudents() {
    const response = await getStudents();
    setStudents(response.data);
  }

  async function handleAddStudent(student) {
    if (student.id){
      await updateStudent(student.id, student);
    }else{
      await createStudent(student);
      
    }

    await loadStudents();
    setSelectedStudent(null);
  }

  async function handleDelete(id) {
    await deleteStudent(id);
    loadStudents();
    
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>{
    student.first_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
    student.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
    student.admission_number.toLowerCase().includes(search.toLocaleLowerCase()) ||
    student.course.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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
       placeholder="Serch Student(s) ..."
       value={search}
       onChange={(e) => setSearch(e.target.value)}
       className="border p-2 w-full mb-4 rounded"
       >
       
       </input>

      <StudentTable 
      students={filteredStudents}
      onDelete={handleDelete}
      onEdit={handleEdit}
      />
    </div>
  );
}

export default App;