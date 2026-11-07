from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import StudentCreate, StudentResponse,StudentUpdate
from app.crud import create_student, get_students, get_student, update_student, delete_student


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.post(
    "/",
    response_model=StudentResponse
)

def add_student(
    student: StudentCreate,
    db: Session  = Depends(get_db)
):
    return create_student(db, student)


@router.get(
    "/",
    response_model= list[StudentResponse]
)

def read_students(
    db: Session = Depends(get_db)

):
    return get_students(db)



@router.get("/{student_id}", response_model=StudentResponse)
def read_student(
    student_id: int,
    db: Session = Depends(get_db)

):
    student = get_student(db, student_id)

    if not student:
        raise HTTPException(
            student_code=404,
            detail="Student not found"
        )

    return student

@router.put(
        "/{student_id}",
        response_model=StudentResponse
        )
def edit_student(
    student_id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db)
):

    updated = update_student(
        db,
        student_id,
        student
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return updated



@router.delete("/{student_id}")
def remove_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_student(
        db,
        student_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return{
        "message" : "Student deleted"
    }

