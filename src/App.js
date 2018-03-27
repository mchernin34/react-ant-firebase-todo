import React, { Component } from 'react'
import { Layout, Input, Button, List, Icon } from 'antd'

import firestore from './firestore'

import './App.css'

const { Header, Footer, Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)

    // set the default state
    this.state = { addingTodo: false, pendingTodo: '' }
    this.addTodo = this.addTodo.bind(this)
    this.completeTodo = this.completeTodo.bind(this)

    // listen for live changes to the todos collection in Firebase
    firestore.collection('todos').onSnapshot(snapshot => {
      let todos = []

      snapshot.forEach(doc => {
        const todo = doc.data()
        todo.id = doc.id
        if (!todo.completed) todos.push(todo)
      })

      // sort our todos based on time added
      todos.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })

      // anytime the state of the datebase changes, the state is updated
      this.setState({ todos })
    })
  }

  async completeTodo(id) {
    // mark the todo as completed
    await firestore
      .collection('todos')
      .doc(id)
      .set({
        completed: true
      })
  }

  async addTodo() {
    if (!this.state.pendingTodo) return

    // set a flag to indicate loading
    this.setState({ addingTodo: true })

    // add a new todo from the input value
    await firestore.collection('todos').add({
      content: this.state.pendingTodo,
      completed: false,
      createdAt: new Date().toISOString()
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
          <h2>What would you like to accomplish today?</h2>
          <Input
            ref="add-todo-input"
            className="App-add-todo-input"
            size="large"
            placeholder="Add a new todo"
            disabled={this.state.addingTodo}
            onChange={evt => this.setState({ pendingTodo: evt.target.value })}
            value={this.state.pendingTodo}
            onPressEnter={this.addTodo}
            required
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
          <List
            className="App-todos"
            size="large"
            bordered
            dataSource={this.state.todos}
            renderItem={todo => (
              <List.Item>
                {todo.content}
                <Icon
                  onClick={evt => this.completeTodo(todo.id)}
                  className="App-todo-complete"
                  type="check"
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer className="App-footer">&copy; Michael Chernin</Footer>
      </Layout>
    )
  }
}

export default App
