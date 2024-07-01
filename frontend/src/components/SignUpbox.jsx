import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import "../css/SignUpbox.css";
import useAuth from "@/hooks/useAuth";
import {useNavigate } from "react-router-dom";

function SignUpbox() {
    const navigate = useNavigate()
    const { registerAction, authError, setAuthError } = useAuth();
    const [details, setDetails] = useState({
        name: "",
        email: "",
        pass: "",
        cPass: ""
    });
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    useEffect(() => {
        const { pass, cPass } = details;
        if (pass && cPass && pass !== cPass) {
            setError("Passwords do not match!");
        } else {
            setError("");
        }
    }, [details.pass, details.cPass]);

    useEffect(() => {
        console.log(authError)
    }, [authError])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, pass, cPass } = details;
        if (pass !== cPass) {
            setError("Passwords do not match!");
        } else {
            setError("");
            registerAction({ name, email, pass, cPass });
            navigate('/success');
            // console.log("Form submitted", { name, email, pass, cPass });
        }
    };

    return (
        <div className="bg-slate-950 text-gray-50 p-2p rounded-2xl w-50p">
            <form onSubmit={handleSubmit} className="grid place-items-center">
                <h1 className="text-4xl">SignUp</h1>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Name</h2></div>
                    <Input
                        type="text"
                        placeholder="Username"
                        className="m-2p mt-2"
                        name="name"
                        value={details.name}
                        onChange={onChange}
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Email</h2></div>
                    <Input
                        type="email"
                        placeholder="Email"
                        className="m-2p mt-2"
                        name="email"
                        value={details.email}
                        onChange={onChange}
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Password</h2></div>
                    <Input
                        type="password"
                        placeholder="Password"
                        className="m-2p mt-2"
                        name="pass"
                        value={details.pass}
                        onChange={onChange}
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Confirm Password</h2></div>
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        className="m-2p mt-2"
                        name="cPass"
                        value={details.cPass}
                        onChange={onChange}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {authError && <p className="text-red-500">{authError}</p>}
                <Button variant="outline" type="submit" className="text-black">SignUp</Button>
            </form>
        </div>
    );
}

export default SignUpbox;
