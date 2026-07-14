def test_roles_endpoint_reachable(client):
    res = client.get("/api/todo-lists/roles")

    assert res.status_code == 200
    role_names = {role["name"] for role in res.json()}
    assert {"owner", "editor", "viewer"}.issubset(role_names)


def test_create_list(auth_client):
    res = auth_client.post("/api/todo-lists/", json={"name": "Books", "description": "LOTR, Dune, Harry Potter"})

    assert res.status_code == 200
    body = res.json()
    assert body["name"] == "Books"
    assert body["description"] == "LOTR, Dune, Harry Potter"
    assert body["id"]


def test_create_list_requires_auth(client):
    res = client.post("/api/todo-lists/", json={"name": "Movies"})

    assert res.status_code == 403


def test_lists_include_created_list(auth_client):
    auth_client.post("/api/todo-lists/", json={"name": "Plants"})

    res = auth_client.get("/api/todo-lists/")

    assert res.status_code == 200
    assert "Plants" in [lst["name"] for lst in res.json()]


def test_get_unknown_list_returns_404(auth_client):
    res = auth_client.get("/api/todo-lists/999999")

    assert res.status_code == 404


def test_rename_list(auth_client):
    created = auth_client.post("/api/todo-lists/", json={"name": "Renamable"}).json()

    res = auth_client.put(f"/api/todo-lists/{created['id']}", json={"name": "Movies"})

    assert res.status_code == 200
    assert res.json()["name"] == "Movies"


def test_delete_list(auth_client):
    created = auth_client.post("/api/todo-lists/", json={"name": "Temporary"}).json()

    assert auth_client.delete(f"/api/todo-lists/{created['id']}").status_code == 200
    assert auth_client.get(f"/api/todo-lists/{created['id']}").status_code == 404
