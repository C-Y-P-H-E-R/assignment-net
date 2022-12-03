import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import './App.css'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dropDownData: [],
      fields: {},
      errors: {},
      res: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    // this.updateFoot = this.updateFoot.bind(this)

  };

  componentDidMount = () => {
    fetch('http://127.0.0.1:5000/')
    .then(res => res.json())
    .then(result => {
      const sms = result
      console.log('COMPONENT WILL Mount messages : ', sms)
      this.setState({dropDownData: sms})
    })
  }

  handleChange(e) {

    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

      // console.log(this.state)

  }

  submituserRegistrationForm(e) {
    
    e.preventDefault();

    this.setState({errors: this.state.errors}, this.validateForm)


    console.log("validate",this.state.errors)
    
    // if (this.state.errors.length <= 0) {
    //     // console.log(this.state);
    //     // console.log(this.state);
    //     console.log("isValid")
    //     // alert("Form submitted");
    // }
        // } else {
    //   // this.setState({res: "Result: {\"Name\": { \"errors\": " + this.state.errors[e.target.name] + "} }"})
    //   console.log("Hola")
    //   // console.log(this.state.res)
    // }

    // this.setState({
    //   res: "Result: {\"Name\": { \"errors\": " + this.state.errors["emailid"] + "} }"
    // })
    
    // console.log(this.state)
  }

  // updateFoot() {
  //   this.setState({res: "Result: {\"Name\": { \"errors\": " + this.state.errors["emailid"] + "} }"})
  //   console.log(this.state.res)
  // }

  validateForm() {

    let fields = this.state.fields;
    let error = {};
    // let formIsValid = true;
  

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        // formIsValid = false;
        error["username"] = "*Please enter alphabet characters only.";
      }
    } else if (!fields["username"]) {
      // formIsValid = false;
      error["username"] = "*Please enter your username.";
    } else if (fields["username"].length < 4) {
      // formIsValid = false;
      error["username"] = "*Please enter a bigger username.";
    } else if (fields["username"].length > 10) {
      // formIsValid = false;
      error["username"] = "*Please enter a smaller username.";
    } 

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


    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        // formIsValid = false;
        error["mobileno"] = "*Please enter valid mobile no.";
      }
    } else if (!fields["mobileno"]) {
      // formIsValid = false;
      error["mobileno"] = "*Please enter your mobile no.";
    }

    this.setState({
      errors: error
    }, () => {console.log("validation", this.state.errors)});

    return error;
  }


render() {
  return (
  <div id="main-registration-container">
   <div id="register">
      <h3>Registration page</h3>
      <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
      
      
      <label>Name</label>
      <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
      <div className="errorMsg">{this.state.errors.username}</div>
      
      
      <label>Email ID:</label>
      <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
      <div className="errorMsg">{this.state.errors.emailid}</div>


      <label>Mobile No:</label>
      <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange}   />
      <div className="errorMsg">{this.state.errors.mobileno}</div>


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
  
  {
    // this.state.errors && Object.keys(this.state.errors).map((key) => {
    //   return <p>{this.state.errors[key]}</p>
    // })

    // this.state.errors && Object.keys(this.state.errors).forEach((key) => {
    //   this.state.errors[key] += ", "
    //   this.state.res = this.state.res + this.state.errors[key] 
    // })
    
    console.log(this.state.errors)
  }

  <p align="center" id="status-data">
    {
      this.state.res.length > 0 && this.state.res
    }
  </p>

  {
    // console.log(this.state.res)
  }

</div>

    );
}


}

