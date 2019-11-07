import React from 'react';
import "../CSS/Base.css";



import Header from "./Header";


function BaseLayout(props) {

  return (
    <main className="container-fluid body">
        <Header />
        {props.children}
    </main>
  );
}

export default BaseLayout;
