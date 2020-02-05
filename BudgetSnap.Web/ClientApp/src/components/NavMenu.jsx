import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import LoginNavControl from "./LoginNavControl"
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);    

    const toggle = () => {
        setIsOpen(!isOpen);
    }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">BudgetSnap.Web</NavbarBrand>
                        <NavbarToggler onClick={toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {props.user != null && 
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/transactions">Transactions</NavLink>
                                    </NavItem>
                                }
                                {props.user != null && 
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/userinfo">User Info</NavLink>
                                    </NavItem>
                                }                                
                                <NavItem>
                                    <LoginNavControl />
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );  
    }

// map the redux state to the props of this component to access the data.
function mapStateToProps(state) {    
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(NavMenu);
