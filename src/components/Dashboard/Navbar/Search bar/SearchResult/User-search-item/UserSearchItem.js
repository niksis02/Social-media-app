import './UserSearchItem.css';

const UserSearchItem = ({user}) => {
    return ( 
        <li>
            <h1>{user.name}</h1>
            <h2>{user.surname}</h2>
        </li>
     );
}
 
export default UserSearchItem;