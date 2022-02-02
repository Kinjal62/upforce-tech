import React from "react";
import { Form, Button, Card } from 'react-bootstrap';
import * as Constants from '../Constants';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class TalentSignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',

        firstNameError: null,
        lastNameError: null,
        userNameError: null,
        emailError: null,
        passwordError: null
    };

    validate = () => {
        let firstNameError = "";
        let lastNameError = "";
        let userNameError = "";
        let emailError = "";
        let passwordError = "";

        var regExp = new RegExp("(?:[A-Za-z]+)(?:[A-Za-z]*)$");
        var usernameExp = new RegExp("(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$");
        var Email = this.state.email;
        var pwd = this.state.password;

        if (!this.state.firstName) {
            firstNameError = "Your first name cannot be empty.";
        } else {
            if (!regExp.test(this.state.firstName)) {
                firstNameError = "Please enter only characters";
            }
        }

        if (!this.state.lastName) {
            lastNameError = "Your last name cannot be empty.";
        } else {
            if (!regExp.test(this.state.lastName)) {
                lastNameError = "Please enter only characters";
            }
        }

        if (!this.state.userName) {
            userNameError = "Your username cannot be empty.";
        } else {
            if (!usernameExp.test(this.state.userName)) {
                userNameError = "Please enter only characters or number.";
            }
        }

        var reg = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}");
        if (!this.state.email) {
            emailError = "The email address cannot be empty";
        } else {
            if (Email.length > 101) {
                emailError = "Your email id cannot be more than 100 characters.";
            } else {
                if (!reg.test(Email)) {
                    emailError = "Please enter a valid email address.";
                }
            }
        }

        var regPwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (!this.state.password) {
            passwordError = "The password cannot be empty";
        } else {
            if (pwd.length < 8) {
                passwordError = "Password cannot be less than eight characters";
            } else {
                if (!regPwd.test(pwd)) {
                    passwordError =
                        "Please enter a valid password, and it should contain at least one uppercase letter, one lowercase letter, one number and one special character. e.g. (Welcome@1)";
                }
            }
        }

        if (
            firstNameError ||
            lastNameError ||
            userNameError ||
            emailError ||
            passwordError) {
            this.setState({
                firstNameError,
                lastNameError,
                userNameError,
                emailError,
                passwordError
            });
            return false;
        }
        return true;
    }

    signUp = () => {
        const formData = new FormData();
        formData.append("first_name", this.state.firstName);
        formData.append("last_name", this.state.lastName);
        formData.append("username", this.state.userName);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);

        fetch(Constants.BaseUrl + 'talent', {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("id", data.id);
                toast.success('Your registration has been successfully completed.');

                console.log("first_name", this.state.firstName);
                console.log("last_name", this.state.lastName);
                console.log("username", this.state.userName);
                console.log("email", this.state.email);
                console.log("password", this.state.password);
            })
            .catch((error) => {
                if (error.message === 'Failed to fetch') {
                    toast.error('Oops!!!... There is no Internet Connection');
                }
            });
    }

    onSubmit = async () => {
        if (this.validate()) {
            this.setState({
                firstNameError: null,
                lastNameError: null,
                userNameError: null,
                emailError: null,
                passwordError: null
            })
            this.signUp();
        }
    }

    render() {
        return (
            <div>
                <Card.Body>
                    <Card.Title className="title mt-1">Create Your Talent Account</Card.Title>
                    <Form className="mt-4 form">
                        <Form.Group className="mt-3" controlId="formBasicFname">
                            <Form.Label className="label">First name *</Form.Label>
                            <Form.Control
                                className="inputField"
                                type="text"
                                placeholder="First name"
                                value={this.state.firstName}
                                onChange={
                                    (event) =>
                                        this.setState({ firstName: event.target.value })
                                } />
                        </Form.Group>
                        {!!this.state.firstNameError && (
                            <Form.Text className="text-danger">{this.state.firstNameError}</Form.Text >
                        )}
                        <Form.Group className="mt-3" controlId="formBasicLname">
                            <Form.Label className="label">Last name *</Form.Label>
                            <Form.Control
                                className="inputField"
                                type="text"
                                placeholder="Last name"
                                value={this.state.lastName}
                                onChange={
                                    (event) =>
                                        this.setState({ lastName: event.target.value })
                                } />
                        </Form.Group>
                        {!!this.state.lastNameError && (
                            <Form.Text className="text-danger">{this.state.lastNameError}</Form.Text >
                        )}
                        <Form.Group className="mt-3" controlId="formBasicUsername">
                            <Form.Label className="label">Username *</Form.Label>
                            <Form.Control
                                className="inputField"
                                type="text"
                                placeholder="Username"
                                value={this.state.userName}
                                onChange={
                                    (event) =>
                                        this.setState({ userName: event.target.value })
                                } />
                        </Form.Group>
                        {!!this.state.userNameError && (
                            <Form.Text className="text-danger">{this.state.userNameError}</Form.Text >
                        )}
                        <Form.Group className="mt-3" controlId="formBasicEmail">
                            <Form.Label className="label">Email *</Form.Label>
                            <Form.Control
                                className="inputField"
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={
                                    (event) =>
                                        this.setState({ email: event.target.value })
                                } />
                        </Form.Group>
                        {!!this.state.emailError && (
                            <Form.Text className="text-danger">{this.state.emailError}</Form.Text >
                        )}
                        <Form.Group className="mt-3" controlId="formBasicPassword">
                            <Form.Label className="label">Password *</Form.Label>
                            <Form.Control
                                className="inputField"
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={
                                    (event) =>
                                        this.setState({ password: event.target.value })
                                } />
                        </Form.Group>
                        {!!this.state.passwordError && (
                            <Form.Text className="text-danger">{this.state.passwordError}</Form.Text >
                        )}
                        <Form.Group className="mt-3 mx-auto d-flex justify-content-center" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" checked className="termsText" label={"I agree to the Terms and Conditions."} />
                        </Form.Group>
                        <Button className="button mx-auto mt-3 mb-5 d-flex justify-content-center"
                            onClick={this.onSubmit}>SIGN UP</Button>
                    </Form>
                </Card.Body>
            </div>
        )
    }
}
export default TalentSignUp;
