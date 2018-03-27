import React, { Component } from 'react'
import { Layout, Input, Button } from 'antd'

import firestore from './firestore'

import './App.css'

const { Header, Footer, Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { addingTodo: false, pendingTodo: '' }
    this.addTodo = this.addTodo.bind(this)
  }

  async addTodo(evt) {
    // set a flag to indicate loading
    this.setState({ addingTodo: true })
    // add a new todo from the value of the input
    await firestore.collection('todos').add({
      content: this.state.pendingTodo,
      completed: false
    })
    // remove the loading flag and clear the input
    this.setState({ addingTodo: false, pendingTodo: '' })
  }

  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>Quick Todo</h1>
        </Header>
        <Content className="App-content">
          <Input
            ref="add-todo-input"
            className="App-add-todo-input"
            size="large"
            placeholder="What would you like to accomplish today?"
            disabled={this.state.addingTodo}
            onChange={evt => this.setState({ pendingTodo: evt.target.value })}
            value={this.state.pendingTodo}
            onPressEnter={this.addTodo}
          />
          <Button
            className="App-add-todo-button"
            size="large"
            type="primary"
            onClick={this.addTodo}
            loading={this.state.addingTodo}
          >
            Add Todo
          </Button>
        </Content>
        <Footer className="App-footer">&copy; Michael Chernin</Footer>
      </Layout>
    )
  }
}

export default App
