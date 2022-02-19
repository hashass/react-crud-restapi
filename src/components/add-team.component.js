import React, { Component } from "react";
import TeamDataService from "../services/team.service";
export default class AddTeam extends Component {
  constructor(props) {
    super(props);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onChangeTeamNationality = this.onChangeTeamNationality.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.newTeam = this.newTeam.bind(this);
    this.searchTeamName = this.searchTeamName.bind(this);
    this.state = {
      id: null,
      TeamName: "",
      TeamNationality: "", 
      published: false,
      submitted: false
    };
  }
  onChangeTeamName(e) {
    this.setState({
      TeamName: e.target.value
    });
  }
  onChangeSearchTeamName(e) {
    const searchTeamName = e.target.value;
    this.setState({
      searchTeamName: searchTeamName
    });
  }
  onChangeTeamNationality(e) {
    this.setState({
      TeamNationality: e.target.value
    });
  }
  saveTeam() {
    var data = {
      TeamName: this.state.TeamName,
      TeamNationality: this.state.TeamNationality
    };
    TeamDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          TeamName: response.data.TeamName,
          TeamNationality: response.data.TeamNationality,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newTeam() {
    this.setState({
      id: null,
      TeamName: "",
      TeamNationality: "",
      published: false,
      submitted: false
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
      return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTeam}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="TeamName">Team Name</label>
              <input
                type="text"
                className="form-control"
                id="TeamName"
                required
                value={this.state.TeamName}
                onChange={this.onChangeTeamName}
                name="TeamName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Team Nationality">Team Nationality</label>
              <input
                type="text"
                className="form-control"
                id="Team nationality"
                required
                value={this.state.TeamNationality}
                onChange={this.onChangeTeamNationality}
                name="Team Nationality"
              />
            </div>
                        <button onClick={this.saveTeam} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
  }


