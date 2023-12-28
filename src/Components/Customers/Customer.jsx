import React, { Component } from 'react'

class Customer extends Component {
  onDelete = () => {
    // console.log("This customer details has been delete")
    this.props.onDelete(this.props.customer.id)
  }
  onEdit = () => {
    this.props.onEdit(this.props.customer)
    // console.log('edit')
  }
  render() {
      const {id,name,email,mobile} = this.props.customer;
      return (
            <tr>
                <td style={{textAlign:'center'}}>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobile}</td>
                <td style={{textAlign:'center'}}>
                    <button style={{marginRight:'20px'}} className='mini ui blue button' onClick={this.onEdit}>Edit</button>
                    <button className='mini ui red button' onClick={this.onDelete}>Delete</button>
                </td>
            </tr>
      )
  }
}
export default Customer;