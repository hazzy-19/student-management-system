from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models import Student
from app.schemas import StudentCreate, StudentUpdate

def create_student(db: Session, student: StudentCreate):
    db_student = Student(
        admission_number = student.admission_number,
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        course=student.course,
        year=student.year,

    )
    try:

        db.add(db_student)
        db.commit()
        db.refresh(db_student)
        return db_student
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Admission numberalready exists"
        )



def get_students(db: Session):
    return db.query(Student).all()


def get_student(db: Session, student_id: int):
    return db.query(Student).filter(
        Student.id == student_id
    ).first()

def update_student(
        db: Session,
        student_id:int,
        student_data: StudentUpdate
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return None

    student.admission_number = student_data.admission_number
    student.first_name = student_data.first_name
    student.last_name = student_data.last_name
    student.email = student_data.email
    student.course = student_data.course
    student.year = student_data.year

    try:
        db.commit()
        db.refresh(student)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Admission number already exists"
        )
    return student

def delete_student(
        db: Session,
        student_id: int
):
    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        return None

    db.delete(student)
    db.commit()

    return student

