import React, { Component } from 'react';
import api from '../../services/api';
import { Table } from "../Table";
import "bootstrap/dist/css/bootstrap.css"

export default class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entities: {
        data: [],
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 5,
        to: 1,
        total: 1,
      },
      first_page: 1,
      current_page: 1,
      sorted_column: this.props.columns[0],
      offset: 4,
      order: 'asc',
    };
  }

  fetchEntities() {
    api.get(`/user?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`)
    .then(response => {
        this.setState({ entities: response.data.data });
    });
  }

  changePage(pageNumber) {
    this.setState({ current_page: pageNumber }, () => {this.fetchEntities()});
  }

  columnHead(value) {
    return value.split('_').join(' ').toUpperCase()
  }

  pagesNumbers() {
    if (!this.state.entities.to) {
      return [];
    }
    let from = this.state.entities.current_page - this.state.offset;
    if (from < 1) {
      from = 1;
    }
    let to = from + (this.state.offset * 2);
    if (to >= this.state.entities.last_page) {
      to = this.state.entities.last_page;
    }
    let pagesArray = [];
    for (let page = from; page <= to; page++) {
      pagesArray.push(page);
    }
    return pagesArray;
  }

  componentDidMount() {
    this.setState({ current_page: this.state.entities.current_page }, () => {this.fetchEntities()});
  }

  tableHeads() {
    return this.props.columns.map(column => {
      return <th className="table-head" key={column}>
      { this.columnHead(column) }
        </th>
    });
  }

  userList() {
    //   console.log(this.state.entities);
    if (this.state.entities.data.length) {
      return this.state.entities.data.map(user => {
        return <Table.TR>
                <Table.TD>{user.id}</Table.TD>
                <Table.TD>{user.name}</Table.TD>
                <Table.TD>{user.email}</Table.TD>
                <Table.TD>{user.cellphone}</Table.TD>
                <Table.TD>{user.phone}</Table.TD>
                <Table.TD>{user.instaaccount}</Table.TD>
                <Table.TD>{user.faceaccount}</Table.TD>
                <Table.TD>Editar | Apagar</Table.TD>
            </Table.TR>
      })
    } else {
      return <tr>
        <td colSpan={this.props.columns.length} className="text-center">No Records Found.</td>
      </tr>
    }
  }

  pageList() {
    return this.pagesNumbers().map(page => {
      return <li className={ page === this.state.entities.current_page ? 'page-item active' : 'page-item' } key={page}>
        <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
      </li>
    })
  }

  render() {
    return (
        <div>
            <table className="table table-bordered">
           <thead>
             <tr>{ this.tableHeads() }</tr>
           </thead>
           <tbody>{ this.userList() }</tbody>
        </table> 
        { (this.state.entities.data && this.state.entities.data.length > 0) &&
         <nav>
           <ul className="pagination">
              <li className="page-item">
                <button className="page-link"
                  disabled={ 1 === this.state.entities.current_page }
                  onClick={() => this.changePage(this.state.entities.current_page - 1)}
                >
                  Previous
                </button>
              </li>
              { this.pageList() }
              <li className="page-item">
                <button className="page-link"
                  disabled={this.state.entities.last_page === this.state.entities.current_page}
                  onClick={() => this.changePage(this.state.entities.current_page + 1)}
                >
                  Next
                </button>
              </li>
              <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying { this.state.entities.data.length } of { this.state.entities.total } entries.</i></span>
            </ul>
          </nav>
          
        }
        </div>
    );
  }
}