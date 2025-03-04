import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ text: "", amount: "" });

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    let newErrors = { text: "", amount: "" };

    if (!text) newErrors.text = "Expanse name is required";
    if (!amount) newErrors.amount = "Amount is required";

    // If there are errors, set them and stop the function
    if (newErrors.text || newErrors.amount) {
      setErrors(newErrors);
      return;
    }

    // Proceed if no errors
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    addTransaction(newTransaction);

    // Clear input fields and errors
    setText("");
    setAmount("");
    setErrors({ text: "", amount: "" });
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Expanse Name</label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z ]*$/.test(value)) {
                setText(value);
              }
            }}
            placeholder="Enter text..."
          />
          {errors.text && <small style={{ color: "red" }}>{errors.text}</small>}
        </div>

        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
          {errors.amount && (
            <small style={{ color: "red" }}>{errors.amount}</small>
          )}
        </div>

        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
