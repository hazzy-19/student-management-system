from sqlalchemy import Integer, String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    admission_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    first_name: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    last_name: Mapped[str] =mapped_column(
        String,
        nullable=False
    )

    email :Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    course: Mapped[str]= mapped_column(
        String,
        nullable=False

    )

    year:Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()
    )


student = Student()
