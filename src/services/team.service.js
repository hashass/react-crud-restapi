import http from "../http-common";
class TeamDataService {
  getAll() {
    return http.get("/teams");
  }
  get(id) {
    return http.get(`/teams/${id}`);
  }
  create(data) {
    return http.post("/teams", data);
  }
  update(id, data) {
    return http.put(`/teams/${id}`, data);
  }
  delete(id) {
    return http.delete(`/teams/${id}`);
  }
  deleteAll() {
    return http.delete(`/teams`);
  }
  findByTeamName(TeamName) {
    return http.get(`/teams?TeamName=${TeamName}`);
  }
}
export default new TeamDataService();
