import React from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import $ from 'jquery'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import Api from '../utility/Api';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class UserRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            errors: {},
            showsuccess: false,
            redirect:false

        };
        this.handleChange = this.handleChange.bind(this);
        this.Signin = this.Signin.bind(this);
        this.showSuccessMsg = this.showSuccessMsg.bind(this);

    }
    componentDidMount(){
        var token=localStorage.getItem("token")
        if(token){
            this.setState({
                redirect:true
            })
        }
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "email can not be empty!";
        }
        else {
            if (typeof fields["email"] !== "undefined") {
                let lastAtPos = fields["email"].lastIndexOf("@");
                let lastDotPos = fields["email"].lastIndexOf(".");

                if (
                    !(
                        lastAtPos < lastDotPos &&
                        lastAtPos > 0 &&
                        fields["email"].indexOf("@@") === -1 &&
                        lastDotPos > 2 &&
                        fields["email"].length - lastDotPos > 2
                    )
                ) {
                    formIsValid = false;
                    errors["email"] = "email is not valid!";
                }
            }
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "password can not be empty!";
        }
        var check = true;
        $("input:radio").each(function () {
            var name = $(this).attr("name");
            if ($("input:radio[name=" + name + "]:checked").length === 0) {
                check = false;
            }
        });

        if (check) {
        }
        else {
            formIsValid = false;
            errors["gender"] = "please select one option!";

        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    Signin() {
        if (this.handleValidation()) {
            this.setState({ errors: "" });
            var gender = $("input[name='gender']:checked").val();
            var data = JSON.stringify({
                "userName": this.state.email,
                "password": this.state.password,
                "gender": gender
            });

            fetch(Api.baseUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.data) {
                        localStorage.setItem("token", responseJson.data.token)
                        this.setState({
                            showsuccess: true,
                            title: "Registered Successfully.",
                            alert_messege: ""
                        })
                    }
                    else {
                        this.setState({
                            showsuccess: true,
                            title: "Email already exist.",
                            alert_messege: ""
                        })
                    }
                })
                .catch(error => {
                    this.setState({ errors: true });
                });

        }
    }
    showSuccessMsg() {
        this.setState({
            showsuccess: false,
            modal: false,
        })
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/login" />;
        }
        return (
            <div className="container">

                <div className="row d-flex justify-content-center mt-5">

                    <Form className="col-sm-6 shadow-form">
                        <h2 className="text-center mb-5">Registration</h2>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email" placeholder="Email" required
                                    onChange={this.handleChange} />
                            </Col>
                            <span style={{ color: "red" }}>
                                {this.state.errors["email"]}
                            </span>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="password" required
                                    onChange={this.handleChange} placeholder="Password" />
                            </Col>
                            <span style={{ color: "red" }}>
                                {this.state.errors["password"]}
                            </span>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-2">Gender</legend>
                            <Col sm={10}>
                                <FormGroup check>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="MALE" />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="FEMALE" />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="others" value="OTHERS" />
                                        <label className="form-check-label" htmlFor="others">Others</label>
                                    </div>
                                    <span style={{ color: "red" }}>
                                        {this.state.errors["gender"]}
                                    </span>
                                </FormGroup>

                            </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col className="d-flex justify-content-center align-items-center">
                       already have an account? <NavLink to="/login" className="signup">login here</NavLink>
                            </Col>
                        
                        </FormGroup>
                        <FormGroup check row>
                            <Col className="d-flex justify-content-center">
                                <Button onClick={() => this.Signin()}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <SweetAlert  title={this.state.title?this.state.title:""} show={this.state.showsuccess} onConfirm={this.showSuccessMsg}>
                        {this.state.alert_messege}
                    </SweetAlert>    </div> </div>
        );
    }
}