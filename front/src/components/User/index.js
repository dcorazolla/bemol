import React, { Component } from "react";
import UserDataService from "../../services/user";
import viacep from "../../services/viacep";
import "bootstrap/dist/css/bootstrap.css";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSenha = this.onChangeSenha.bind(this);
    this.onChangeCell = this.onChangeCell.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeInsta = this.onChangeInsta.bind(this);
    this.onChangeFace = this.onChangeFace.bind(this);
    this.onChangeCep = this.onChangeCep.bind(this);
    this.onChangeEndereco = this.onChangeEndereco.bind(this);
    this.onChangeCidade = this.onChangeCidade.bind(this);
    this.onChangeUf = this.onChangeUf.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        email: "", 
        password: "",
        cellphone: "",
        phone: "",
        instaaccount: "",
        faceaccount: "",
        cep: "",
        endereco: "",
        cidade: "",
        uf: ""
    },
      cepok: false,
      podeenviar: false,
      submitted: false,
      message: ""
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {

    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    });
    this.podeEnviar();
  }

  onChangeEmail(e) {

    const email = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            email: email
          }
        };
      });

    this.podeEnviar();
  }

  onChangeSenha(e) {

    const senha = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            senha: senha
          }
        };
      });
    this.podeEnviar();
  }

  onChangeCell(e) {

    const cellphone = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            cellphone: cellphone
          }
        };
      });
    this.podeEnviar();

  }

  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(function(prevState) {
        return {
            currentUser: {
                ...prevState.currentUser,
                phone: phone
            }
        };
    });
    this.podeEnviar();
  }

  onChangeInsta(e) {
    const instaaccount = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            instaaccount: instaaccount
          }
        };
      });
    this.podeEnviar();

  }

  onChangeFace(e) {
    const faceaccount = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            faceaccount: faceaccount
          }
        };
      });
    this.podeEnviar();

  }

  onChangeCep(e) {
      let cep = e.target.value;
      cep = cep.replace(/([^\d])+/gim, '');

      if (cep.length === 8) {
        viacep.get(e.target.value + "/json/")
        .then(response => {
            if (!response.data.erro && response.status === 200 && response.statusText === "OK")
            {
                this.setState(function(prevState) {
                    return {
                      currentUser: {
                        ...prevState.currentUser,
                        endereco: response.data.logradouro + " " + response.data.bairro,
                        cidade: response.data.localidade,
                        uf: response.data.uf
                      },
                      cepok: true
                    };
                  });
            }
            else
            {
                alert("CEP inválido");
                this.setState(function(prevState) {
                    return {
                      cepok: false
                    };
                  });
            }
            // console.log(response);
        });
      }
      else
      {
        this.setState(function(prevState) {
            return {
              cepok: false
            };
          });
      }
    //   console.log(cep);
    this.setState(function(prevState) {
        return {
            currentUser: {
                ...prevState.currentUser,
                cep: e.target.value
              }
        };
      });

    this.podeEnviar();
  }

  podeEnviar() {
    const { name, email, password } = this.state.currentUser;
    const { cepok } = this.state;

    if (name.trim()!=="" && email.trim()!=="" && cepok)
    {
        this.setState(function(prevState) {
            return {
                podeenviar: true
            };
          });
    }
    else
    {
        this.setState(function(prevState) {
            return {
                podeenviar: false
            };
          });
    }
  }

  onChangeEndereco(e) {

    const endereco = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            endereco: endereco
          }
        };
      });
    this.podeEnviar();
  }

  onChangeCidade(e) {
    const cidade = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            cidade: cidade
          }
        };
      });
    this.podeEnviar();
  }

  onChangeUf(e) {
    const uf = e.target.value;

    this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            uf: uf
          }
        };
      });
    this.podeEnviar();
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data.data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    this.podeEnviar();

    const { podeenviar } = this.state;

    if (podeenviar) {

        UserDataService.update(
          this.state.currentUser
        )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "Usuário alterado com sucesso"
            });
            this.props.history.push('/user');
          })
          .catch(e => {
            console.log(e);
          });
    }
    else {
        alert("Preencha todos os campos obrigatórios");
    }
      console.log(this.state.currentUser);
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/user')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>Usuário</h4>

            <form>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nome *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={currentUser.name}
                                onChange={this.onChangeName}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={currentUser.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="senha"
                                required
                                value={currentUser.password}
                                onChange={this.onChangeSenha}
                                name="senha"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cellphone">Celular</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cellphone"
                                value={currentUser.cellphone}
                                onChange={this.onChangeCell}
                                name="cellphone"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={currentUser.phone}
                                onChange={this.onChangePhone}
                                name="phone"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="instaaccount">Instagram</label>
                            <input
                                type="text"
                                className="form-control"
                                id="instaaccount"
                                value={currentUser.instaaccount}
                                onChange={this.onChangeInsta}
                                name="instaaccount"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="faceaccount">Facebook</label>
                            <input
                                type="text"
                                className="form-control"
                                id="faceaccount"
                                value={currentUser.faceaccount}
                                onChange={this.onChangeFace}
                                name="faceaccount"
                            />
                        </div>
                    </div>
                    <div className="col-md-6" >
                        <div className="form-group">
                            <label htmlFor="cep">CEP *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cep"
                                required
                                value={currentUser.cep}
                                onChange={this.onChangeCep}
                                name="cep"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                type="text"
                                className="form-control"
                                id="endereco"
                                value={currentUser.endereco}
                                onChange={this.onChangeEndereco}
                                name="endereco"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cidade"
                                value={currentUser.cidade}
                                onChange={this.onChangeCidade}
                                name="cidade"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uf">UF</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uf"
                                value={currentUser.uf}
                                onChange={this.onChangeUf}
                                name="uf"
                            />
                        </div>
                    </div>
                </div>
            </form>

            <button
              type="submit"
              className="button button-success"
              onClick={this.updateUser}
            >
              Alterar
            </button>

            <button
              className="button button-danger mr-2"
              onClick={this.deleteUser}
            >
              Apagar
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione um usuário para editar...</p>
          </div>
        )}
      </div>
    );
  }
}