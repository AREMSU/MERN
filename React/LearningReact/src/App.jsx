import React, { useState } from "react";
import SunwayNavLink from './SunwayNavLink'
import SunwayRoute from './SunwayRoute'
import User from "./User";
import Product from "./Product";
import Review from "./Review";
import Customer from "./Customer";
import Job from "./Job";
import LearnUseState1 from "./LearnUseState/LearnUseState1";
import UseStateHook from "./LearnUseState/UseStateHook";
import LearnUseState2 from "./LearnUseState/LearnUseState2";
import Terneary from "./LearnUseState/Terneary";
import Form1 from "./forms/Form1";

const App = () => {
  let name = "aarnav";
  let surname = "dahal";

  // State to track if the product was created successfully
  const [isSuccess, setIsSuccess] = useState(true);

  return (
    <div>
      <SunwayNavLink></SunwayNavLink>
      <SunwayRoute></SunwayRoute>

      <p>
        Name is {name} surname is {surname}
      </p>

      <p> 1+1 is {1 + 1} </p>

      <img src="./favicon.svg" alt=""></img>

      <p className="sucess">Product created successfully</p>

      <p className="error">Unable to create product</p>



      <User> </User>  {/* this and <User /> have the same function*/}

      <Product> </Product>

      <Review> </Review>

      <Customer></Customer>

      <Job title="teacher" location="kathmandu" salary={100000}></Job>

      <LearnUseState1></LearnUseState1>

      <LearnUseState2></LearnUseState2>

      <UseStateHook></UseStateHook>

      <Terneary></Terneary>

      <Form1></Form1>

    </div>
  );
};

export default App;
