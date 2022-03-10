import React from 'react'

export default class Form extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit();
  }

  onChange = e => {
    const { value, id } = e.target;
    this.props.onChange(id, value);
  }

  render() {
    const { values } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          type="text"
          id="todoInput"
          placeholder="add todo"
          onChange={this.onChange}
          value={values.todoInput}
        />
        <input type="submit" />
      </form>
    )
  }
}
