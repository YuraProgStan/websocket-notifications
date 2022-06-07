import React, {useEffect, useState} from 'react';
import './navbar.css';
import Notification from '../../img/notification1.svg'
import Message from '../../img/message1.svg'
import Settings from '../../img/settings1.svg'

const Navbar = ({socket}) => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    // useEffect(() => {
    //     socket.on('getNotification', data => {
    //         setNotifications(prev => [...prev, data])
    //     })
    // }, [socket]);
    useEffect(() => {
        socket.on('getText', data => {
            setNotifications(prev => [...prev, data])
        })
    }, [socket]);

    console.log(notifications);

    const displayNotification = ({senderName, text}) => {
    // const displayNotification = ({senderName, type}) => {
    //     let action;
        // if (type === 1) {
        //     action = 'liked'
        // } else if (type === 2) {
        //     action = 'commented'
        // } else {
        //     action = 'shared'
        // }
        return (
            // <span key={Date.now()} className='notification'>{`${senderName} ${action} your post`}</span>
            <span key={Date.now()} className='notification'>{`${senderName} ${text}`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    }
    return (
        <div className="navbar">
            <span className="logo">Yura App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img className="iconImg" src={Notification} alt=""/>
                    {
                        notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img className="iconImg" src={Message} alt=""/>
                    <div className="counter">2</div>
                </div>

                <div className="icon" onClick={() => setOpen(!open)}>
                    <img className="iconImg" src={Settings} alt=""/>
                    <div className="counter">2</div>
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map(n => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>Mark as read</button>
                </div>
            )}

        </div>
    );
};

export default Navbar;