import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

const Layout = (props) => {

    return (
        <React.Fragment>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </React.Fragment>
    );
};

export default Layout;
