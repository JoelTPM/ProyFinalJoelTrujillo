function studentEntity(item) {
  return {
    id: item.id,
    name: item.name,
    age: item.age,
    grade: item.grade,
    qualification: item.qualification,
  };
}

function studentsEntity(items) {
  return items.map(studentEntity);
}

module.exports = { studentEntity, studentsEntity };
