import http from "../http-common";

class ItemDataService {
  getAll(params) {
    return http.get("/items", {params});
  }

  get(id) {
    return http.get(`/items/${id}`);
  }

  create(data) {
    return http.post("/items", data);
  }

  update(id, data) {
    return http.put(`/items/${id}`, data);
  }

  delete(id) {
    return http.delete(`/items/${id}`);
  }

  deleteAll() {
    return http.delete(`/items`);
  }

  findByName(name) {
    return http.get(`/items?name=${name}`);
  }
}

export default new ItemDataService();