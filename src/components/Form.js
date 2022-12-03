import React from "react";

const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dropDownData: [],
      email: '',
      username: '',
      mobileno: '',
      formErrors: {email: '', username: '', mobileno: ''},
      emailValid: false,
      usernameValid: false,
      mobilenoValid: false,
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };

  componentDidMount = () => {
    fetch('http://127.0.0.1:5000/')
    .then(res => res.json())
    .then(result => {
      const sms = result
      this.setState({dropDownData: sms})
    })
  }

  handleChange(e) {

    const name = e.target.name;
    const value = e.target.value;

    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });


  }

  submituserRegistrationForm(e) {
    
    e.preventDefault();

  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let usernameValid = this.state.usernameValid
    let mobilenoValid = this.state.mobilenoValid
  
    console.log(fieldName, value)
    switch(fieldName) {
      case 'email':
        emailValid = value.match(emailRegex);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'username':
        usernameValid = value.length <= 10 && value.length >= 4;
        fieldValidationErrors.username = usernameValid ? '': ' is not appropriate size';
        break;
      case 'mobileno':
        mobilenoValid = value.length === 10;
        fieldValidationErrors.mobileno = mobilenoValid ? '': ' is not appropriate size';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    usernameValid: usernameValid,
                    mobilenoValid: mobilenoValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.usernameValid && this.state.mobilenoValid});
  }



render() {
  return (
  <div id="main-registration-container">
   <div id="register">
      <h3>Registration page</h3>
      <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
      
      
      <label>Name</label>
      <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
      <div className="errorMsg">{this.state.formErrors.username}</div>
      
      
      <label>Email ID:</label>
      <input type="text" name="email" value={this.state.email} onChange={this.handleChange}  />
      <div className="errorMsg">{this.state.formErrors.email}</div>


      <label>Mobile No:</label>
      <input type="text" name="mobileno" value={this.state.mobileno} onChange={this.handleChange}   />
      <div className="errorMsg">{this.state.formErrors.mobileno}</div>


      <label>Country</label>

      <section>
        
        <select className="selectColor">
          <option>Default</option>
          {
            this.state.dropDownData.map(el => {
              return <option>{el.country}</option>
            })
          }
        </select>
      </section>

      <label>State</label>
      
        <section>
        <select className="selectColor">
          <option>Default</option>
          {
            this.state.dropDownData.map(el => {
              return <option>{el.state}</option>
            })
          }
        </select>
      </section>

      <input type="submit" className="button"  value="Register"/>
      </form>
  </div>


   
  <p align="center" id="status-data">
    {
      (
        this.state.formErrors.email != "" || 
        this.state.formErrors.mobileno != "" || 
        this.state.formErrors.username != ""
      ) && 
      
      (
        "Result: {\"Name\": { \"errors\": " + this.state.formErrors.email + ", " 
        + this.state.formErrors.username + ", " + this.state.formErrors.mobileno + "} }"
      )
    }
  </p>

</div>

    );
  }
}

















/*

if (typeof fields["username"] !== "undefined") {
    //   if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
    //     // formIsValid = false;
    //     error["username"] = "*Please enter alphabet characters only.";
    //   }
    // } else if (!fields["username"]) {
    //   // formIsValid = false;
    //   error["username"] = "*Please enter your username.";
    // } else if (fields["username"].length < 4) {
    //   // formIsValid = false;
    //   error["username"] = "*Please enter a bigger username.";
    // } else if (fields["username"].length > 10) {
    //   // formIsValid = false;
    //   error["username"] = "*Please enter a smaller username.";
    // } 

    if (!fields["emailid"]) {
      // formIsValid = false;
      error["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        // formIsValid = false;
        error["emailid"] = "*Please enter valid email-ID.";
      }
    }


    // if (typeof fields["mobileno"] !== "undefined") {
    //   if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
    //     // formIsValid = false;
    //     error["mobileno"] = "*Please enter valid mobile no.";
    //   }
    // } else if (!fields["mobileno"]) {
    //   // formIsValid = false;
    //   error["mobileno"] = "*Please enter your mobile no.";
    // }

*/