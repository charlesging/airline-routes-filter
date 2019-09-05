import React, { Component } from 'react';

class Select extends Component {

  handleChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);    
  }

  render() {

    const options = this.props.options.map((option) => {
      let value = option[this.props.valueKey];
      return (
        <option key={value} value={value} disabled={ !this.props.filtered.includes(value) }>
          { option[this.props.titleKey] }
        </option>
      )
    });

    return (
      <select value={ this.props.value } onChange={ this.handleChange }>
        <option key="all" value="all">{ this.props.allTitle }</option>
        { options }
      </select>
    )
  }
}

export default Select;