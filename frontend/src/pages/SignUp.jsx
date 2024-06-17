import React from "react";
import SignUpbox from "@/components/SignUpbox";
import "../css/font.css";
import axios from "axios";
function SignUp() {

    const fetch = async () => {
        const res = await axios.get('/api/users')
        console.log(res)
        const resData = await res.data
        console.log(resData)
    }
    return (
        <div className="grid place-items-center h-screen bg-slate-300 gilroy">
            <SignUpbox />
            <button
                onClick={fetch}
            >
                Click me to fetch
            </button>
        </div>
    );
};

export default SignUp;