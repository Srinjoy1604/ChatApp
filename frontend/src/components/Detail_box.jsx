import React,{useState} from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import "../css/Detail_box.css";
function DetailBox() {
    const [visible1,setvisibility1]=useState(false);
    function display1()
    {
        setvisibility1(!visible1);
    }
    const [visible2,setvisibility2]=useState(false);
    function display2()
    {
        setvisibility2(!visible2);
    }
    return (
        <div className="bg-slate-950 text-gray-50 p-2p rounded-2xl w-50p ">

            <form action="" className="grid place-items-center">
                <h1 className="text-4xl">Login</h1>
                <div className={visible1?"transition-all duration-2 ease-in-out w-full see":"hide"}><h2 className="text-left">Username</h2></div>
                <Input type="text" placeholder="Username" className="m-2p mt-2" onFocus={display1} onBlur={display1}/>
                <div className={visible2?"transition-all duration-2 ease-in-out w-full see":"hide"}><h2 className="text-left">Password</h2></div>
                <Input type="password" placeholder="Password" className="m-2p mt-2" onFocus={display2} onBlur={display2}/>
                <Button variant="outline" type="submit" className="text-black">Login</Button>
            </form>

        </div>
    );
};

export default DetailBox;
