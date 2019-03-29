import React from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
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
        this.token=localStorage.getItem('token')
        this.handleChange = this.handleChange.bind(this);
        this.Login = this.Login.bind(this);
        this.showMsg = this.showMsg.bind(this);

    }
    componentDidMount(){        
        if (this.token) {
            this.setState({
                redirect: true
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
        this.setState({ errors: errors });
        return formIsValid;
    }
    Login() {
        if (this.handleValidation()) {
            this.setState({ errors: "" });
            var data = JSON.stringify({
                "userName": this.state.email,
                "password": this.state.password,

            });

            fetch(Api.baseUrl() + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.data) {
                        localStorage.clear();
                        localStorage.setItem("token", responseJson.data.token)
                        this.setState({
                            showsuccess: true,
                            title: "Login Successfully.",
                            alert_messege: "",
                            redirect:true                  
                        })
                       
                    }
                    else {
                        this.setState({
                            showsuccess: true,
                            title: responseJson.errorMessage,
                            alert_messege: "",
                          
                        })
                    }
                })
                .catch(error => {
                    this.setState({ errors: true });
                });

        }
    }
    showMsg() {
        this.setState({
            showsuccess: false,
            modal: false
        })
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/userlist" />;
        }
        return (
            <div className="container">

                <div className="row d-flex justify-content-center mt-5">

                    <Form className="col-sm-6 shadow-form">
                        <h2 className="text-center mb-5">Login</h2>
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
                        <FormGroup check row>
                            <Col className="d-flex justify-content-center">
                                <Button onClick={() => this.Login()}>Login</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                        <Col className="d-flex justify-content-center align-items-center">
                       new user? <NavLink to="/register" className="signup">signup</NavLink>
                            </Col>
                        
                        </FormGroup>
                    </Form>
                
                    <SweetAlert title={this.state.title?this.state.title:""} show={this.state.showsuccess} onConfirm={this.showMsg}>
                        {this.state.alert_messege}
                    </SweetAlert>
                        </div> </div>
        );
    }
}