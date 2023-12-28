import React,{Component} from 'react'

class Form extends Component {
    state = {
        form : {name:"", email:"", mobile:"", isEdit:false},
        btnName: "save",
        btnClass:"ui primary button submit-button"
    }

    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            this.setState({
                form:{ ...this.props.customer, isEdit:true},
                btnName:"Update",
                btnClass:"ui orange button submit-button"
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }
    
    onFormSubmit = event => {
        event.preventDefault();
        if(this.formValidation()){
            // console.log("Everything  gonna ready!!!")
            this.props.onFormSubmit(this.state.form)
        }
        this.clearFormFields();
    }
    formValidation = () => {
        if(document.getElementsByName('name')[0].value === ''){
            alert("Enter the Name");
            return false;
        }
        if(document.getElementsByName('email')[0].value === ''){
            alert("Enter the Email Address");
            return false;
        }
        if(document.getElementsByName('mobile')[0].value === ''){
            alert("Enter the Mobile Number");
            return false;
        }
        return true;
    }

    clearFormFields = () => {
        this.setState({
            form : {name:"", email:"", mobile:"", isEdit:false},
        })
        this.setState({
            btnName:"Save",
            btnClass:"ui primary button submit-button"
        })
        document.querySelector('.form').reset();
    }
    render(){
        return (
            <form className='ui form'>
                <div className="fields">
                    <div className='four wide field' >
                        <label>Name</label>
                        <input type="text" name='name' onChange={this.handleChange} placeholder='Enter your name' value={this.state.form.name} />
                    </div>

                    <div className='four wide field' >
                        <label>Email</label>
                        <input type="email" name='email' onChange={this.handleChange} placeholder='Enter your Email'  value={this.state.form.email} />
                    </div>

                    <div className='four wide field' >
                        <label>Mobile</label>
                        <input type="text" name='mobile' onChange={this.handleChange} placeholder='Enter your mobile number'  value={this.state.form.mobile}/>
                    </div>

                    <div className='four wide field' >
                        <button className={this.state.btnClass} onClick={this.onFormSubmit} >{this.state.btnName}</button>
                    </div>

                </div>
            </form>
        )
    }
}
export default Form;