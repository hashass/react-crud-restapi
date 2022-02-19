import React, { Component } from "react";
import TeamDataService from "../services/team.service";
import { Link } from "react-router-dom";
export default class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTeamName = this.onChangeSearchTeamName.bind(this);
    this.retrieveTeams = this.retrieveTeams.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTeam = this.setActiveTeam.bind(this);
    this.removeAllTeams = this.removeAllTeams.bind(this);
    this.searchTeamName = this.searchTeamName.bind(this);
    this.state = {
      teams: [],
      currentTeam: null,
      currentIndex: -1,
      searchTeamName: ""
    };
  }
  componentDidMount() {
    this.retrieveTeams();
  }
  onChangeSearchTeamName(e) {
    const searchTeamName = e.target.value;
    this.setState({
      searchTeamName: searchTeamName
    });
  }
  retrieveTeams() {
    TeamDataService.getAll()
      .then(response => {
        this.setState({
          teams: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrieveTeams();
    this.setState({
      currentTeam: null,
      currentIndex: -1
    });
  }
  setActiveTeam(Team, index) {
    this.setState({
      currentTeam: Team,
      currentIndex: index
    });
  }
  removeAllTeams() {
    TeamDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchTeamName() {
    TeamDataService.findByTeamName(this.state.searchTeamName)
      .then(response => {
        this.setState({
          teams: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTeamName, teams, currentTeam, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Team Name"
              value={searchTeamName}
              onChange={this.onChangeSearchTeamName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTeamName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Teams List</h4>
          <ul className="list-group">
            {teams &&
              teams.map((Team, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTeam(Team, index)}
                  key={index}
                >
                  {Team.TeamName}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTeams}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTeam ? (
            <div>
              <h4>Information</h4>
              <div>
                <label>
                  <strong>Team Name:</strong>
                </label>{" "}
                {currentTeam.TeamName}
              </div>
              <div>
                <label>
                  <strong>Team Nationality:</strong>
                </label>{" "}
                {currentTeam.TeamNationality}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTeam.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/teams/" + currentTeam.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Team...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  }


