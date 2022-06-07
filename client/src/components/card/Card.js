import React, {useState} from 'react';
import './card.css';
import Comment from '../../img/comment1.svg';
import Heart from '../../img/heart1.svg';
import HeartFilled from '../../img/heartFilled1.svg';
import Info from '../../img/info1.svg';
import Share from '../../img/share1.svg';


const Card = ({post, socket, user}) => {
    const [liked, setLiked] = useState(false);

    // const handleNotification = (type) => {
    //     setLiked(true);
    //     socket.emit('sendNotification', {
    //         senderName: user,
    //         receiverName: post.username,
    //         type
    //     })
    // }

    const handleNotification = (type) => {
      type === 1 &&  setLiked(true);
        socket.emit('sendText', {
            senderName: user,
            receiverName: post.username,
            text: "hello this is chat message"
        })
    }
    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} className="userImg" alt=""/>
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} className="postImg" alt=""/>
            <div className="interaction">
                {liked
                    ?  <img src={HeartFilled} alt="" className="cardIcon"/>
                    :  <img src={Heart} alt="" className="cardIcon" onClick={() => handleNotification(1)}/>
                }
                <img src={Comment} alt="" className="cardIcon" onClick={() => handleNotification(2)}/>
                <img src={Share} alt="" className="cardIcon" onClick={() => handleNotification(3)}/>
                <img src={Info} alt="" className="cardIcon infoIcon"/>
            </div>
        </div>
    );
};

export default Card;