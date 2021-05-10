import React, { Component } from "react";
import UserDataService from "../../services/user";
import { Link } from "react-router-dom";

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    // this.retrieveTutorials = this.retrieveTutorials.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveTutorial = this.setActiveTutorial.bind(this);
    // this.removeAllTutorials = this.removeAllTutorials.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data.data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

//   refreshList() {
//     this.retrieveTutorials();
//     this.setState({
//       currentTutorial: null,
//       currentIndex: -1
//     });
//   }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

//   removeAllTutorials() {
//     TutorialDataService.deleteAll()
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   searchTitle() {
//     TutorialDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           tutorials: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
          <div className="col-md-6">
            <h4>Lista de usuários</h4>
            <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentUser ? (
                <p>aa</p>
            ) : (
                <div>
                  <br />
                  <p>Selecione um usuário ao lado para editar</p>
                </div>
            )}
          </div>
        {/* 
        
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}