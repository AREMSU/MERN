import React, { useState } from "react";

const Form1 = () => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [address, setAddress] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, address);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text"
                    onChange={(e) => {
                        setName(e.target.value)
                    }
                    }></input>
            </div>
            <div>
                <label>Email</label>
                <input type="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }
                    }></input>
            </div>
            <div>
                <label>Password</label>
                <input type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }
                    }></input>
            </div>
            -
            <div>
                <label>Address</label>
                <input type="text"
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }
                    }></input>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default Form1;