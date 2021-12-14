import { useEffect, useMemo, useState, useRef, useContext } from 'react';

import MessengerHeader from './Messenger header/MessengerHeader';
import Message from './Message/Message';
import InfiniteScrollUp from '../../../Helpers/InfiniteScrollUp';
import useScrollFetch from '../../../Hooks/useScrollFetch';
import { DashboardContext } from '../../../Contexts/DashboardContext';

import sendMessageIcon from '../../../Assets/Pictures/sendMessage.svg';

import './Messenger.css';

const Messenger = ({ user, currentUser }) => {
    const [message, setMessage] = useState('');
    const bottomRef = useRef(null);
    const token = localStorage.getItem('token');
    const { socket } = useContext(DashboardContext);

    const body = useMemo(() => {
        return {
            senderId: currentUser._id,
            receiverId: user._id, 
        }
    }, [currentUser, user]);

    const { 
        data: arrivalMessages, 
        setData: setArrivalMessages, 
        loading, 
        pageHandler 
    } = useScrollFetch('http://localhost:5000/users/messages/get', body, 'post');

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [bottomRef.current, arrivalMessages]);

    useEffect(() => {
        socket.current.on('getMessage', msg => {
            console.log('msg: ', msg);
            setArrivalMessages(messages => [...messages, msg]);
        });
    }, [])

    const handleSend = async e => {
        if(message) {
            const sendingMessage = {
                senderId: currentUser._id,
                receiverId: user._id,
                text: message
            }

            try {
                const response = await fetch('http://localhost:5000/users/messages/add', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify(sendingMessage)
                })

                const result = await response.json();
                if(result.status === 'ok') {
                    setArrivalMessages(messages => [...messages, {...sendingMessage, _id: result.msg}]);
                    setMessage('');
                    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                    socket.current.emit('sendMessage', sendingMessage);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
    }

    return ( 
        <div className="messenger">
            <MessengerHeader user={user} />
            <div className="chat-body">
                <InfiniteScrollUp cb={pageHandler}>
                    {
                        arrivalMessages.map(msg => {
                            return <Message msg={msg} own={msg.senderId === currentUser?._id} user={user} key={msg._id} />
                        })
                    }
                    <div ref={bottomRef}></div>
                </InfiniteScrollUp>
            </div>
            <div className="chat-input">
                <input 
                    type="text"
                    placeholder="Aa"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                />
                <img src={sendMessageIcon} alt="Send" onClick={e => { handleSend(e) }} />
            </div>
        </div>
     );
}
 
export default Messenger;