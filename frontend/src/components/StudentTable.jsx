function StudentTable({ students, onDelete, onEdit }) {
  return (
    <table className="w-full border mt-5">
      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Admission</th>
          <th>Name</th>
          <th>Course</th>
          <th>Year</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>

            <td>{student.admission_number}</td>

            <td>
              {student.first_name} {student.last_name}
            </td>

            <td>{student.course}</td>

            <td>{student.year}</td>
            <td>

              <button
                onClick={() => onEdit(student)}
                className= "bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit

              </button>

              <button
                  onClick={() => onDelete(student.id)}
              >
                  Delete
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;