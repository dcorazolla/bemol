import React, { Component } from "react";
import UserDataService from "../../services/user";
import { Link } from "react-router-dom";

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

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

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

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
                <div>
                  <h4>Usuário</h4>
                  <div>
                    <label>
                      <strong>Nome:</strong>
                    </label>{" "}
                    {currentUser.name}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentUser.email}
                  </div>
                  <div>
                    <label>
                      <strong>Celular:</strong>
                    </label>{" "}
                    {currentUser.cellphone}
                  </div>
                  <div>
                    <label>
                      <strong>Fone:</strong>
                    </label>{" "}
                    {currentUser.phone}
                  </div>
                  <div>
                    <label>
                      <strong>Instagram:</strong>
                    </label>{" "}
                    {currentUser.instaaccount}
                  </div>
                  <div>
                    <label>
                      <strong>Facebook:</strong>
                    </label>{" "}
                    {currentUser.faceaccount}
                  </div>
                  <div>
                    <label>
                      <strong>CEP:</strong>
                    </label>{" "}
                    {currentUser.cep}
                  </div>
                  <div>
                    <label>
                      <strong>Endereço:</strong>
                    </label>{" "}
                    {currentUser.endereco}
                  </div>
                  <div>
                    <label>
                      <strong>Cidade:</strong>
                    </label>{" "}
                    {currentUser.cidade}
                  </div>
                  <div>
                    <label>
                      <strong>UF:</strong>
                    </label>{" "}
                    {currentUser.uf}
                  </div>
                  <Link
                    to={"/user/edit/" + currentUser.id}
                    className="button button-warning"
                  >
                  Editar
                  </Link>
                </div>
            ) : (
                <div>
                  <br />
                  <p>Selecione um usuário ao lado para detalhes</p>
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