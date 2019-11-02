import React from 'react';
import "../CSS/Base.css";



import Header from "./Header";
import Footer from "./Footer";

function BaseLayout(props) {

  return (
    <main className="container-fluid body">
        <Header />
        {props.children}
        <Footer />
    </main>
  );
}

export default BaseLayout;
