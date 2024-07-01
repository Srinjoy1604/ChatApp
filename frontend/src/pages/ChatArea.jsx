import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../css/ChatArea.css";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
function ChatArea() {
    const { userData } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [currentRoom, setCurrentRoom] = useState("None");
    const [socketid, setSocketid] = useState("");
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const socket = useMemo(() => io("http://localhost:6900"), []);
    useEffect(() => {
        socket.on("connect", () => {
            setSocketid(socket.id);
            console.log("connected", socket.id);


        });
        socket.on("welcome", (s) => {
            console.log(s);


        });
        socket.on("recieved-message", (data) => {
            console.log(data);
            setMessages((messages) => [...messages, data]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        if (userData) {
            console.log("User data received:", userData);
            
        }
    }, [userData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages((messages) => [...messages, message]);
        setSentMessage(message);
        socket.emit("message", { message, room });
        setMessage("");

    }

    const handleJoinRoom = (e) => {
        e.preventDefault();
        socket.emit("join-room", roomName);
        setCurrentRoom(roomName);
        setRoomName("");

    }
    const handleRoomLeave = () => {

        socket.emit("Leave-room", currentRoom);
        setCurrentRoom("None");
    }
    return (
        <div className="m-2p Dashboard">
            <div className="FriendDiv"> 
                <h1>FRIENDS</h1>
                <div className="FriendBox">
                    {friends.map((friend, index) => {
                        <div onClick={handleJoinRoom}>{friend}</div>
                    })}
                </div>
            </div>
            <div>
                <h1 style={{ color: "black" }} >{`Socket ID: ${socketid}`}</h1>
                <h1 style={{ color: "black" }} >{`Welcome ${userData.data.user.name}`}</h1>
                <div className="ChatBlock">
                    <div className="FriendBar"><h1>(Name of friend)</h1></div>
                    <div className="grid place-items-center  w-full h-8 Msgarea">
                    
                            <div className="MsgBlock">
                            {messages.map((m, index) => (
                                <div className={m == sentMessage ? "MsgDivsent" : "MsgDiv"} key={index}>
                                    <p key={index}>{m}</p>
                                </div>
                            ))}
                            </div>
                    </div>
                </div>
                <form className="grid place-items-center p-2p Msgform" onSubmit={handleSubmit}>
                    <Input type="text" value={message} onChange={e => setMessage(e.target.value)} name="message" placeholder="Enter msg" className="m-2p p-2p" />
                    <Input type="text" value={room} onChange={e => setRoom(e.target.value)} name="room" placeholder="Enter room" className="m-2p p-2p" />
                    <Button variant="outline" type="submit" className="text-black">Send</Button>
                </form>

            </div>
            <div>
                <form className="grid place-items-center bg-yellow-200 p-2p" onSubmit={handleJoinRoom}>
                    <h3>{`Room currently joined:${currentRoom}`}</h3>
                    <Button variant="outline" type="button" className="text-black" onClick={handleRoomLeave}>Leave Room</Button>
                    <h5>JOIN ROOM</h5>
                    <Input type="text" value={roomName} onChange={e => setRoomName(e.target.value)} name="roomName" placeholder="Enter Room" className="m-2p p-2p" />
                    <Button variant="outline" type="submit" className="text-black">JOIN</Button>
                </form>
            </div>
        </div>
    );
}

export default ChatArea;