from conftest import PASSWORD, unique_username


def test_register_returns_tokens(client):
    creds = {"username": unique_username(), "password": PASSWORD}

    res = client.post("/api/users/", json=creds)

    assert res.status_code == 200
    body = res.json()
    assert body["username"] == creds["username"]
    assert body["userId"]
    assert body["accessToken"]
    assert body["refreshToken"]


def test_duplicate_registration(client):
    creds = {"username": unique_username(), "password": PASSWORD}
    client.post("/api/users/", json=creds)

    res = client.post("/api/users/", json=creds)

    assert res.status_code == 400


def test_login_with_correct_password(client):
    creds = {"username": unique_username(), "password": PASSWORD}
    client.post("/api/users/", json=creds)

    res = client.post("/api/users/login", json=creds)

    assert res.status_code == 200
    assert res.json()["accessToken"]


def test_login_rejects_wrong_password(client):
    creds = {"username": unique_username(), "password": PASSWORD}
    client.post("/api/users/", json=creds)

    res = client.post("/api/users/login", json={"username": creds["username"], "password": "wrongpassword"})

    assert res.status_code == 401


def test_login_rejects_unknown_user(client):
    res = client.post("/api/users/login", json={"username": unique_username("unknown"), "password": PASSWORD})

    assert res.status_code == 401
