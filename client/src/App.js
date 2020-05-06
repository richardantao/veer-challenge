import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";

import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

import TxtPage from "./components/TxtPage";
import BtnPage from "./components/BtnPage";
import Contact from "./components/Contact";

export default () => {
  return (
    <>
      <Navbar role="navigation" id="nav">
        <Nav>
          <NavItem>
            <NavLink href="/button">Text Page</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/text">Button Page</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact Form</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/button" component={TxtPage}/>
        <Route path="/text" component={BtnPage}/>
        <Route path="/contact" component={Contact}/>
      </Switch>
    </>
  );
};
