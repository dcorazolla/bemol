import React, { Component } from "react";
import DataTable from "../DataTable";

export default class ReactDataTableApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = ['ID', 'Nome', 'Email', 'Celular', 'Fone', 'Insta', 'Face', 'Ações'];
    return (
      <DataTable columns={columns} />
    );
  }
}