import React, { Component } from "react";
import styles from "./ErrorBoundary.module.css";


class ErrorBoundary extends Component {


  constructor(props) {

    super(props);

    this.state = {
      hasError:false
    };

  }



  static getDerivedStateFromError(){

    return {
      hasError:true
    };

  }



  componentDidCatch(error, info){

    console.error(
      "Application Error:",
      error,
      info
    );

  }



  handleReload = () => {

    window.location.reload();

  };



  render(){


    if(this.state.hasError){


      return (

        <div className={styles.container}>


          <h1>
            ⚠️
          </h1>


          <h2>
            Something went wrong
          </h2>


          <p>
            We couldn't load this page.
            Please try again.
          </p>



          <button
            onClick={this.handleReload}
          >
            Reload Application
          </button>


        </div>

      );


    }


    return this.props.children;


  }

}


export default ErrorBoundary;