import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/bemol-digital-inline-colorful.svg";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Form, Container } from "./styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Informe o e-mail e senha para continuar" });
    } else {
      try {
        const response = await api.post("/login", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Dados incorretos. Tente novamente..."
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
            <img src={Logo} alt="Logo Bemol Digital" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);