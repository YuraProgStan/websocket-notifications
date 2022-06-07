import React, {useEffect, useState} from 'react';
import './app.css'
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import {posts} from './data';
import {io} from "socket.io-client";

const App = () => {
    const [username, setUserName] = useState('');
    const [user, setUser] = useState('');
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        setSocket(io("http://localhost:5000"));
        // socket.on('firstEvent', (msg) => {
        //     console.log(msg)
        // })
    }, [])

    useEffect(() => {
        socket?.emit('newUser', user)
    }, [socket, user])
    return (
        <div className="container">
            {user
                ? (
                    <>
                        <Navbar socket={socket}/>
                        {posts.map(post => (
                            <Card key={post.id} post={post} socket={socket} user={user}/>
                        ))}

                        <span className="username">{username}</span>
                    </>
                )

                : (
                    <div className="login">
                        <input type="text"
                               placeholder="username"
                               onChange={(e) => setUserName(e.target.value)}/>
                        <button onClick={() => setUser(username)}>Login</button>
                    </div>

                )}

        </div>
    );
};

export default App;