import React, { Component } from "react";
import Logo from "../../assets/bemol-digital-inline-colorful.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch } from "react-router-dom";
import AddUser from "../../components/AddUser";
import ListUser from "../../components/ListUser";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/user" className="navbar-brand">
            <img src={Logo} alt="Logo Bemol Digital" />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/user/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/user" component={ListUser} />
            <Route exact path="/user/add" component={AddUser} />
            {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import api from "../../services/api";

// import Logo from "../../assets/bemol-digital-inline-colorful.svg";
// // import api from "../../services/api";
// // import { login } from "../../services/auth";
// import { Form, Container } from "./styles";
// import { Table } from "../../components/Table";
// import ReactDataTableApp from "../../components/ReactDataTableApp";
// import "bootstrap/dist/css/bootstrap.css"
// import DataTable from "../../components/DataTable";

// class User extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       name: null,
//       email: null,
//       password: null,
//       cellphone: null,
//       phone: null,
//       instaaccount: null,
//       faceaccount: null,
//     };
//   }

//   componentWillMount(){
//     this.getUserData();
//   }

//   async getUserData(pageNumber=1) {
//     const response = await api.get(`/user?page=${pageNumber}`);
//     this.setState({users: response.data.data});
//   }

//   gravarUsuario = async e => {
//     e.preventDefault();
//     const { name, email, password, cellphone, phone, instaaccount, faceaccount } = this.state;
//     if (!name || !email || !password) {
//       this.setState({ error: "Informe o nome, email e senha" });
//     } else {
//       try {
//         api.post("/user", { name, email, password, cellphone, phone, instaaccount, faceaccount })
//         .then(response=>{
//           // this.props.history.push("/user");
//           // console.log(response);
//           // DataTable.atualiza();
//         });
//         // login(response.data.token);?
//         // this.props.history.push("/app");
//       } catch (err) {
//         this.setState({
//           error:
//             "Dados incorretos. Tente novamente..."
//         });
//       }
//     }
//   };

//   // render() {
//   //   return (
//   //     <Container>
//   //       <img src={Logo} alt="Logo Bemol Digital" />
//   //     </Container>
//   //   );
//   // }

//   render() {
//     let { users } = this.state;
//     return (
//       <div>
//       <h1>Usuários</h1>
//       <ReactDataTableApp />
//       <Form onSubmit={this.gravarUsuario}>
//       {this.state.error && <p>{this.state.error}</p>}
//       <input
//         type="text"
//         placeholder="Nome do usuário" 
//         onChange={e => this.setState({ name: e.target.value })}
//         />
//       <input
//             type="email"
//             placeholder="Endereço de e-mail"
//             onChange={e => this.setState({ email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Senha"
//             onChange={e => this.setState({ password: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Celular"
//             onChange={e => this.setState({ cellphone: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Fone"
//             onChange={e => this.setState({ phone: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Instagram"
//             onChange={e => this.setState({ instaaccount: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Facebook"
//             onChange={e => this.setState({ faceaccount: e.target.value })}
//           />
//           <button type="submit">Gravar</button>
//       </Form>
//       </div>
//     );
//   }
// }

// export default withRouter(User);