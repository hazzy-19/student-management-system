import { useState, useEffect } from "react";

function StudentForm({ onSubmit, selectedStudent }) {
  const [formData, setFormData] = useState({
    admission_number: "",
    first_name: "",
    last_name: "",
    email: "",
    course: "",
    year: ""
  });

  useEffect(() => {
    if (selectedStudent){
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      admission_number: "",
      first_name: "",
      last_name: "",
      email: "",
      course: "",
      year: ""
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <input
        name="admission_number"
        placeholder="Admission Number"
        value={formData.admission_number}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="year"
        type="number"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;