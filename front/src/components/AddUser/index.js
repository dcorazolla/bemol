import React, { Component } from "react";
import UserDataService from "../../services/user";
import viacep from "../../services/viacep";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

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

    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
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
      uf: "",
      cepok: false,
      podeenviar: false,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
    this.podeEnviar();
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
    this.podeEnviar();
  }

  onChangeSenha(e) {
    this.setState({
      password: e.target.value
    });
    this.podeEnviar();
  }

  onChangeCell(e) {
    this.setState({
      cellphone: e.target.value
    });
    this.podeEnviar();

  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
    this.podeEnviar();

  }

  onChangeInsta(e) {
    this.setState({
      instaaccount: e.target.value
    });
    this.podeEnviar();

  }

  onChangeFace(e) {
    this.setState({
      faceaccount: e.target.value
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
                this.setState({
                    endereco: response.data.logradouro + " " + response.data.bairro,
                    cidade: response.data.localidade,
                    uf: response.data.uf,
                    cepok: true
                });
            }
            else
            {
                alert("CEP inválido");
            }
            // console.log(response);
        });
      }
      else
      {
          this.setState({
              cepok: false
          });
      }
    //   console.log(cep);
    this.setState({
      cep: e.target.value
    });

    this.podeEnviar();
  }

  podeEnviar() {
    const { name, email, password, cepok } = this.state;

    if (name.trim()!=="" && email.trim()!=="" && password.trim()!=="" && cepok)
    {
        this.setState({
            podeenviar: true
        });
    }
    else
    {
        this.setState({
            podeenviar: false
        });
    }
  }

  onChangeEndereco(e) {
    this.setState({
      endereco: e.target.value
    });
    this.podeEnviar();
  }

  onChangeCidade(e) {
    this.setState({
      cidade: e.target.value
    });
    this.podeEnviar();
  }

  onChangeUf(e) {
    this.setState({
      uf: e.target.value
    });
    this.podeEnviar();
  }

  saveUser() {

    this.podeEnviar();

    const { podeenviar } = this.state;

    if (podeenviar) {
        var data = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password,
            cellphone: this.state.cellphone,
            phone: this.state.phone,
            instaaccount: this.state.instaaccount,
            faceaccount: this.state.faceaccount,
            cep: this.state.cep,
            endereco: this.state.endereco,
            cidade: this.state.cidade,
            uf: this.state.uf
          };
      
          UserDataService.create(data)
            .then(response => {
              this.setState({
                  id: response.data.id,
                  name: response.data.name,
                  email: response.data.email, 
                  password: response.data.password,
                  cellphone: response.data.cellphone,
                  phone: response.data.phone,
                  instaaccount: response.data.instaaccount,
                  faceaccount: response.data.faceaccount,
                  cep: response.data.cep,
                  endereco: response.data.endereco,
                  cidade: response.data.cidade,
                  uf: response.data.uf,
                  submitted: true
              });
              console.log(response.data);
              this.props.history.push('/user');
            })
            .catch(e => {
              console.log(e);
            });
    }
    else
    {
        alert("Preencha todos os campos obrigatórios");
    }
    
  }

  newUser() {
    this.setState({
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
      uf: "",
      cepok: false,
      podeenviar: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Dados enviados com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Adicionar Outro
            </button>
          </div>
        ) : (
          <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                />
                </div>

                <div className="form-group">
                <label htmlFor="senha">Senha *</label>
                <input
                    type="password"
                    className="form-control"
                    id="senha"
                    required
                    value={this.state.password}
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
                    value={this.state.cellphone}
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
                    value={this.state.phone}
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
                    value={this.state.instaaccount}
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
                    value={this.state.faceaccount}
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
                    value={this.state.cep}
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
                    value={this.state.endereco}
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
                    value={this.state.cidade}
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
                    value={this.state.uf}
                    onChange={this.onChangeUf}
                    name="uf"
                  />
                </div>
              </div>

              <button onClick={this.saveUser} className="btn btn-success"  >
                Enviar
              </button>
          </div>
        )}
      </div>
    );
  }
}