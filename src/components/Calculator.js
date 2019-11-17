import React, { useState } from "react";
import axios from "axios";

function Calculator() {
  // state
  const [solution, setSolution] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [symbol, setSymbol] = useState("");

  // styles
  const equalStyle = {
    width: "50%"
  };

  const operationStyle = {
    height: "3rem",
    fontSize: "2rem",
    fontFamily: "Inconsolata, monospace",
    backgroundColor: "#333",
    color: "#fff"
  };

  // set operands
  const setOperands = num => {
    // if operand is not set, set to unassigned operand
    if (op1 === "") setOp1(num);
    else if (op2 === "") setOp2(num);
  };

  // reset all state
  const resetAll = () => {
    setOp1("");
    setOp2("");
    setSymbol("");
    setSolution("");
  };

  // method called when "=" is pressed
  const sendData = () => {
    // create post data
    const data = {
      operand1: op1,
      operand2: op2,
      operation: symbol,
      answer: solution
    };

    // send data and set solution state
    axios
      .post("https://localhost:44371/api/calculatorapi/", data)
      .then(res => {
        if (res.data.answer === "") setSolution("= 0");
        else setSolution("= " + res.data.answer);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Roman Numeral Calculator</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* View Operations */}
            <p style={operationStyle}>
              {op1} {symbol} {op2} {solution}
            </p>
          </div>
        </div>
        {/* Operations */}
        <div className="row no-gutters">
          <div className="col">
            <button onClick={() => resetAll()}>Clear All</button>
          </div>
          <div className="col">
            <button onClick={() => setSymbol("+")}>+</button>
          </div>
          <div className="col">
            <button onClick={() => setSymbol("-")}>-</button>
          </div>
          <div className="col">
            <button onClick={() => setSymbol("*")}>*</button>
          </div>
          <div className="col">
            <button onClick={() => setSymbol("/")}>/</button>
          </div>
        </div>
        {/* Numbers */}
        <div className="row no-gutters">
          <div className="col">
            <button onClick={() => setOperands("VII")}>VII</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("VIII")}>VIII</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("IX")}>IX</button>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <button onClick={() => setOperands("IV")}>IV</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("V")}>V</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("VI")}>VI</button>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <button onClick={() => setOperands("I")}>I</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("II")}>II</button>
          </div>
          <div className="col">
            <button onClick={() => setOperands("III")}>III</button>
          </div>
        </div>
        {/* Send data */}
        <div className="row">
          <div className="col">
            <button style={equalStyle} onClick={() => sendData()}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
