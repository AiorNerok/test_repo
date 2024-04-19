from contextlib import asynccontextmanager

from fastapi import FastAPI


ctx = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    ctx["started"] = True
    yield
    ctx.clear()


app = FastAPI(lifespan=lifespan)


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}
