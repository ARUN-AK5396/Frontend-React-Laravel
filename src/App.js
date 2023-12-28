import React,{Component} from 'react'
import axios from 'axios'
import Form from './Components/Form/Form';
import CustomerList from './Components/Customers/CustomerList';
import Loader from './Components/Loader';

import './App.css'

class App extends Component{

   state= {
      customers:[],
      customer:{},
      loader:false,
      url:"http://127.0.0.1:8000/api/customers"
   };

   getCustomers = async () =>  {
      this.setState({loader:true});
      const customers = await axios.get(this.state.url);
      this.setState({customers:customers.data,loader:false})
   }
   deleteCustomer = async id => {
      this.setState({loader:true});
      await axios.delete(`${this.state.url}/${id}`)
      this.getCustomers();
   }

   createCustomer = async (data) => {
       this.setState({loader : true});

       await axios.post(this.state.url, {
         name: data.name,
         email: data.email,
         mobile: data.mobile
       })
       this.getCustomers();
   }
   updateCustomer = async (data) => {
      this.setState({ customer : {}, loader:true});

      await axios.put(`${this.state.url}/${data.id}`, {
         name: data.name,
         email: data.email,
         mobile: data.mobile
      })
      this.getCustomers();
   }
   onDelete = id => {
      // console.log("app",id)
      this.deleteCustomer(id);
   }
   onEdit = data => {
      // console.log("app",data)
      this.setState({customer:data});
   }
   onFormSubmit = (data) => {
      // console.log('app :' , data);

      if(data.isEdit){
         this.updateCustomer(data)
      }else{
         this.createCustomer(data);
      }
   }
   componentDidMount(){
      this.getCustomers()
   }
  render(){
   return (
      <div>
         <div className="ui fixed inverted menu">
            <div className="ui container" >
               <a href="/#" className="header item">React CRUD Application</a>
            </div>
         </div>
         <div className="ui main container" > 
            <Form customer={this.state.customer} onFormSubmit={this.onFormSubmit}/>
            {this.state.loader ? <Loader /> : ""}
            <CustomerList customers={this.state.customers} onDelete={this.onDelete} onEdit={this.onEdit} />
         </div>
      </div>
   );
 }
}

export default App;
