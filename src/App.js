import React, { Component } from "react";
import axios from 'axios'
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";
class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false,
    responceFromServer: '',
    search:''
  };
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false
    },
    //  () => {
    //   window.localStorage.setItem('savedList', JSON.stringify(this.state.items));
    // }
    );

  };

  handleSearch =(e)=>{
    this.setState({
      search: e.target.value,
    })
    console.log(this.state.search);
  }
  // componentDidMount() {
  //   const list = window.localStorage.getItem('savedList');
  //   const parsedList = JSON.parse(list);
  //   this.setState({
  //     items: parsedList
  //   })
  // }
  clearList = () => {
    this.setState({
      items: []
    });
    localStorage.removeItem('savedList');
  };
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };
  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);

    console.log(selectedItem);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });
  };
 

  // send updated state to server
  sendData = e => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      items: this.state.items
    })
      .then(res => {
        let resp = res;
        this.setState({ responceFromServer: resp });
        console.log(this.state.responceFromServer);
        console.log(resp);
      })
  }


  render() {
    let filterItems = this.state.items.filter((item =>{
      return item.title.toLowerCase().includes(this.state.search.toLowerCase())
    }))
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
              sendData={this.sendData}
              handleSearch={this.handleSearch}
            />
            <TodoList
              // items={this.state.items}
              // filterItems={}
              filterItems={filterItems}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              sendData={this.sendData}
              handleSearch={this.handleSearch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
