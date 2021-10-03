import addFriendIcon from '../../../../Assets/Pictures/add_friend.svg';

import './AddFriend.css';

const AddFriend = ({id}) => {
    const token = localStorage.getItem('token');
    const sendFriendRequest = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/friends/request/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    receiverId: id
                })
            })
        }
        catch(err) {
            console.log(err.message);
        }
    }

    return ( 
        <div className="add-friend-button" onClick={sendFriendRequest}>
            <img src={addFriendIcon} alt="Add Friend" />
            <span>Add Friend</span>
        </div>
     );
}
 
export default AddFriend;