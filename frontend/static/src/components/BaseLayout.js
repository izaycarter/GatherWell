import React , {Component} from 'react';
import "../Css/Base.css";
// import Row from 'react-bootstrap/Row';



import Header from "./Header";

class BaseLayout extends Component{
    constructor(props){
        super(props);
        this.state={
        }

    }


    render(){
      return (
        <main className="container-fluid body">
            <Header/>
            {this.props.children}

        </main>
      );
    }
}

export default BaseLayout;
