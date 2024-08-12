import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState(0);

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      setError("");
      console.log();
      setname(result1.name);
      setage(result1.age);
      setemail(result1.email);
    }
  };

  const handleupdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div>
      <h2 className="text-center"> Edit Entry </h2>
      <form onSubmit={handleupdate}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(a) => setage(a.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
