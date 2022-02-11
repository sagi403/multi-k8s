import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    const fetchValues = async () => {
      const newValues = await axios.get("/api/values/current");
      setValues(newValues.data);
    };

    const fetchIndexes = async () => {
      const newSeenIndexes = await axios.get("/api/values/all");
      setSeenIndexes(newSeenIndexes.data);
    };

    fetchValues();
    fetchIndexes();
  }, [index]);

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", {
      index,
    });
    setIndex("");
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <h1>Welcome To The Fibonacci Calculator - version 2</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={event => setIndex(event.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
