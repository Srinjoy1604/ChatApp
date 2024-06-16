import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import "../css/SignUpbox.css";

function SignUpbox() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("");
            
            console.log("Form submitted", { username, email, password });
        }
    };

    return (
        <div className="bg-slate-950 text-gray-50 p-2p rounded-2xl w-50p ">
            <form onSubmit={handleSubmit} className="grid place-items-center">
                <h1 className="text-4xl">SignUp</h1>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Name</h2></div>
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        className="m-2p mt-2" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Email</h2></div>
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        className="m-2p mt-2" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Password</h2></div>
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        className="m-2p mt-2" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="grid place-items-center grid-flow-col m-2p w-full gridset">
                    <div><h2>Confirm Password</h2></div>
                    <Input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="m-2p mt-2" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button variant="outline" type="submit" className="text-black">SignUp</Button>
            </form>
        </div>
    );
}

export default SignUpbox;

