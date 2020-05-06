import React, { Component } from "react";

import axios from "axios";

import { Container, Row, Col, Form, Label, Input, Button } from "reactstrap";

export default class TxtPage extends Component {
    state = {
        text: "",
        hasError: false,
        result: "Awaiting submission..."
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleKeyDown = e => {
        if(e.keyCode === 13) {
            e.preventDefault();

            const { text } = this.state;

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            axios.post(`http://127.0.0.1:5000/${text}`, null, config)
            .then(res => {
                this.setState({
                    text: "",
                    result: res.data
                });
            })
            .catch(err => {
                this.setState({
                    text: "",
                    hasError: err.message
                });
            });
        } else return;
    };

    render() {
        const { hasError, text, result } = this.state;

        return (
            <Container>
                <Row>
                    <Col>
                        <Form inline>
                            <Label for="text" className="mt-3">Text</Label>
                            <Input
                                name="text"
                                type="text"
                                value={text}
                                onChange={this.handleChange}
                                required
                                className="ml-3 mt-3"
                                onKeyDown={this.handleKeyDown}
                            />

                            <Button type="submit" color="primary" className="ml-3 mt-3">Submit</Button>
                        </Form>
                    </Col>
                    <Col>
                        { hasError ? hasError : result }
                    </Col>
                </Row>
            </Container>
        )
    };
};