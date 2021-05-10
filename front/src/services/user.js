import api from "./api";

class UserDataService {
  getAll() {
    return api.get("/user");
  }

  get(id) {
    return api.get(`/user/${id}`);
  }

  create(data) {
    return api.post("/user", data);
  }

  update(data) {
    return api.put(`/user`, data);
  }

  delete(id) {
    return api.delete(`/user/${id}`);
  }
}

export default new UserDataService();