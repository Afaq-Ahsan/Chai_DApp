import React, { useState,useEffect } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State variable for showing the alert

  const buyChai = async (e) => {
    e.preventDefault();
    const contract = state.contract;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      // After 3 seconds, set showAlert back to false
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);



  return (
    <>
      <div>
        {showAlert && (
          <div className="alert alert-success" role="alert">
            <strong>Success!</strong> Transaction is completed 👍
          </div>
        )}
      </div>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Enter Your Message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
