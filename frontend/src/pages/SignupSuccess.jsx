import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Success()
{
    return(
        <div>
        <h1>WELCOME</h1>
        <div>
            <h1>SignUp successful</h1>
            <Link to={"/login"}><Button variant="outline" type="submit" className="text-black">Login</Button></Link>
            
        </div>
        </div>
    );
};

export default Success;