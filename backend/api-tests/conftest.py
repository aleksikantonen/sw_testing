import os
import uuid
from collections.abc import Iterator

import httpx
import pytest

BASE_URL = os.environ.get("API_BASE_URL", "http://localhost:4322")
PASSWORD = "secret123"


@pytest.fixture()
def client() -> Iterator[httpx.Client]:
    with httpx.Client(base_url=BASE_URL, timeout=10) as c:
        yield c


@pytest.fixture()
def auth_client(client: httpx.Client) -> httpx.Client:
    """a client with a registered user and auth header."""
    creds = {"username": unique_username(), "password": PASSWORD}
    auth = client.post("/api/users/", json=creds).json()
    
    client.headers["Authorization"] = f"Bearer {auth['accessToken']}"
    
    return client


def unique_username(prefix: str = "user") -> str:
    return f"{prefix}_{uuid.uuid4()}"
