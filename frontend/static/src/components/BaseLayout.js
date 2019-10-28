import React from 'react';
import Container from 'react-bootstrap/Container';


import Header from "./Header";
import Footer from "./Footer";

function BaseLayout(props) {

  return (
    <Container>
        <Header />
        {props.children}
        <Footer />
    </Container>
  );
}

export default BaseLayout;
