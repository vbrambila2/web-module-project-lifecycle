import React from 'react';
import axios from 'axios';
import Form from './Form';

let idx = 0
const getIdx = () => ++idx

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  list: [],
  todo: {
    todoInput: '',
    completed: false
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          list: res.data.data,
          successMessage: res.data.message
        })
      })
      .catch(err => console.error(err))
  }

  addTodo = () => {
    const newTodo = {
      id: getIdx(),
      name: this.state.todo.todoInput,
      completed: false
    }
    axios.post(URL, newTodo)
      .then(res => {
        console.log(res.data.data, "data");
        this.setState({
          ...this.state,
          list: [ ...this.state.list, res.data.data ]
        })
      })
      .catch(err => console.error(err))
  }

  onChange = (key, value) => {
    this.setState({
      ...this.state,
      todo: { ...this.state.todo, [key]: value },
    })
  }

  setCompleted = id => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          list: this.state.list.map(li => {
            return li.id === id ? { ...li, completed: res.data.data.completed } : li
          })
        })
      })
      .catch(err => console.error(err))
  }

  deleteTask = id => {
    this.setState({
      ...this.state, list: this.state.list.filter(item => item.id !== id)
    })
  }

  render() {
    const { list, todo } = this.state

    return (
      <div>
        { this.state.successMessage }:
        <ul>
          {  
            list.map(li => {
              const { id, name, completed } = li
              return (
                <li key={id}>
                  {name}
                  <button onClick={() => this.setCompleted(id)}>Completed: { completed ? 'True' : 'False' }</button>
                  <button onClick={() => this.deleteTask(id)}>Delete Task</button>
                </li>
              )
            })
          }
        </ul>
        <Form values={todo} onSubmit={this.addTodo} onChange={this.onChange} />
      </div>
    )
  }
}
