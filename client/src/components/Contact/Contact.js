import React, { Component } from "react";
import axios from "axios";

import { Container, Row, Col, Form, Label, Input, Alert, Button } from "reactstrap";

export default class Contact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        message: "",
        hasError: false,
        confirmation: null
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, email, phone, message } = this.state;

        const body = {
            name,
            email,
            phone,
            message
        };

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        axios.post("http://127.0.0.1:5000/", body, config)
        .then(res => {
            this.setState({ confirmation: res.data });
        })
        .catch(err => {
            this.setState({ hasError: err.message });
        });
    };

    render() {
        const { name, email, phone, message, confirmation } = this.state;

        // Client form validation
        const isEnabled = name.length > 2 && regex.test(email) && phone && message.length > 10;

        return (
            <Container>
                <h1>Contact Form</h1>
                <Row>
                    <Col>
                        { confirmation ? <Alert color="success">{confirmation}</Alert> : null }
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Label for="name" className="mt-3">Name</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        onChange={this.handleChange}
                                        value={name}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="email" className="mt-3">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        onChange={this.handleChange}
                                        value={email}
                                        required
                                    />
                                    { email.length > 5 && !regex.test(email) ? (
                                        <small className="warning">
                                            Email must be a valid email address
                                        </small>
                                    ) : null }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="phone" className="mt-3">Phone</Label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        onChange={this.handleChange}
                                        value={phone}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="message" className="mt-3">Message</Label>
                                    <Input
                                        name="message"
                                        type="textarea"
                                        onChange={this.handleChange}
                                        value={message}
                                        required
                                    />
                                </Col>
                            </Row>

                            <Button type="submit" color="primary" className="mt-3" disabled={!isEnabled}>Send Message</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i