import React , {Component} from 'react';
import "../Css/Base.css";



import Header from "./Header";

class BaseLayout extends Component{
    constructor(props){
        super(props);
        this.state={
        }

    }


    render(){
        console.log(this.state.isAuthenticated)
      return (
        <main className="container-fluid body">
            <Header/>
            {this.props.children}

        </main>
      );
    }
}

export default BaseLayout;
