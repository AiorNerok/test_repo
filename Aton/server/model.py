from sqlmodel import Field, SQLModel, Column, Enum, Relationship
from datetime import datetime
import enum


class Status(str, enum.Enum):
    work = "В работе"
    reject = "Отказ"
    closed = "Сделка закрыта"


class PersonResponsible(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    name: str
    login: str
    password: str

    clients: list["Client"] = Relationship(back_populates="team")


class Client(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    account_number: str
    first_name: str
    middle_name: str
    last_name: str
    born: datetime
    inn: int

    status: Status = Field(sa_column=Column(Enum(Status)))
    person_responsible_id: int | None = Field(
        default=None, foreign_key="PersonResponsible.id"
    )
