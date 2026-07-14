def create_list(auth_client, name="TODO"):
    return auth_client.post("/api/todo-lists/", json={"name": name}).json()


def test_add_item_to_list(auth_client):
    lst = create_list(auth_client)

    res = auth_client.post(f"/api/todo-lists/{lst['id']}/todos", json={"description": "Buy chocolate"})

    assert res.status_code == 200
    body = res.json()
    assert body["description"] == "Buy chocolate"
    assert body["completed"] is False


def test_list_items_includes_created_item(auth_client):
    lst = create_list(auth_client)
    auth_client.post(f"/api/todo-lists/{lst['id']}/todos", json={"description": "Play the guitar"})

    res = auth_client.get(f"/api/todo-lists/{lst['id']}/todos")

    assert res.status_code == 200
    assert "Play the guitar" in [item["description"] for item in res.json()]


def test_add_item_requires_auth(client):
    res = client.post("/api/todo-lists/1/todos", json={"description": "Authorize me!"})

    assert res.status_code == 403
