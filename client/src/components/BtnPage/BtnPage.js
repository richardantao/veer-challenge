import React, { Component } from "react";

import axios from "axios";

import { Container, Row, Col, Button } from "reactstrap";

export default class BtnPage extends Component {
    state = {
        hasError: false,
        users: []
    };

    handleClick = e => {

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            console.log(res)
            this.setState({ users: res.data });
        })
        .catch(err => {
            this.setState({ hasError: err.message });
        });
    };

    render() {
        const { users } = this.state;

        return (
            <Container>
                <Row className="m-5">
                    <Col>
                        <Button onClick={this.handleClick} color="primary" block>Fetch Users</Button>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5>Users - from <a href="https://jsonplaceholder.typicode.com/">https://jsonplaceholder.typicode.com/</a></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {users.map(({ id, name, phone }) => {
                                    return (
                                        <Row key={id}>
                                            <Col xl="3">
                                                {id}
                                            </Col>
                                            <Col xl="5">
                                                {name}
                                            </Col>
                                            <Col xl="4">
                                                {phone}
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    };
};