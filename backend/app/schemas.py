from pydantic import BaseModel


class StudentCreate(BaseModel):
    admission_number: str
    first_name: str
    last_name: str
    email: str
    course: str
    year: int


class StudentUpdate(BaseModel):
    admission_number: str
    first_name: str
    last_name: str
    email: str
    course: str
    year: int


class StudentResponse(StudentCreate):
    id: int

    model_config = {
        "from_attributes": True
    }