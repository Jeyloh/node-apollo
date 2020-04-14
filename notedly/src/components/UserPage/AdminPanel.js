import React from "react";
import "./user-page.css";
import { AuthContext } from "../../App";

const AdminPanel = ({user, refetchUser}) => {

    const { handleLogout } = React.useContext(AuthContext);
    

    return (
        <div className="admin-panel">
            <div>
                <p>Username: <b>{user.username}</b></p>
                <p>Email: <b>{user.email}</b></p>
                <p>ID: <b>{user.id}</b></p>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => refetchUser()}>Refetch</button>
            </div>
        </div>
    )
}

export default AdminPanel;