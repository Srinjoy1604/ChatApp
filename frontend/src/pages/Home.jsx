import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Home()
{
    return(
        <div>
        <h1>WELCOME</h1>
        <div>
            <Link to={"/login"}><Button variant="outline" type="submit" className="text-black">Login</Button></Link>
            <Link to={"/register"}><Button variant="outline" type="submit" className="text-black">SignUp</Button></Link>
        </div>
        </div>
    );
};

export default Home;