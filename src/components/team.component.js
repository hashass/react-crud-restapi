import React, { Component } from "react";
import TeamDataService from "../services/team.service";
export default class Team extends Component {
  constructor(props) {
    super(props);
    this.onChangeTeamName = this.onChangeTeamName.bind(this);
    this.onChangeTeamNationality = this.onChangeTeamNationality.bind(this);
    this.getTeam = this.getTeam.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.state = {
      currentTeam: {
        id: null,
        TeamName: "",
        TeamNationality: "",
        published: false
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getTeam(this.props.match.params.id);
  }
  onChangeTeamName(e) {
    const TeamName = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTeam: {
          ...prevState.currentTeam,
          TeamName: TeamName
        }
      };
    });
  }
  onChangeTeamNationality(e) {
    const TeamNationality = e.target.value;
    
    this.setState(prevState => ({
      currentTeam: {
        ...prevState.currentTeam,
        TeamNationality: TeamNationality
      }
    }));
  }
  getTeam(id) {
    TeamDataService.get(id)
      .then(response => {
        this.setState({
          currentTeam: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updatePublished(status) {
    var data = {
      id: this.state.currentTeam.id,
      teamName: this.state.currentTeam.TeamName,
      teamNationality: this.state.currentTutorial.description,
      published: status
    };
    TeamDataService.update(this.state.currentTeam.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTeam: {
            ...prevState.currentteam,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateTeam() {
    TeamDataService.update(
      this.state.currentTeam.id,
      this.state.currentTeam
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The team was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteTeam() {    
    TeamDataService.delete(this.state.currentTeam.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/teams')
      })
      .catch(e => {
        console.log(e);
      });
  }

        render() {
          const { currentTeam } = this.state;
          return (
            <div>
              {currentTeam ? (
                <div className="edit-form">
                  <h4>Team</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="TeamName">TeamName</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentTeam.TeamName}
                        onChange={this.onChangeTeamName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="TeamNationality">TeamNationality</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentTeam.TeamNationality}
                        onChange={this.onChangeTeamNationality}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <strong>Status:</strong>
                      </label>
                      {currentTeam.published ? "Published" : "Pending"}
                    </div>
                  </form>
                  {currentTeam.published ? (
                    <button
                      className="badge badge-primary mr-2"
                      onClick={() => this.updatePublished(false)}
                    >
                      UnPublish
                    </button>
                  ) : (
                    <button
                      className="badge badge-primary mr-2"
                      onClick={() => this.updatePublished(true)}
                    >
                      Publish
                    </button>
                  )}
                  <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteTeam}
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateTeam}
                  >
                    Update
                  </button>
                  <p>{this.state.message}</p>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Team...</p>
                </div>
              )}
            </div>
          );
        }
      }



