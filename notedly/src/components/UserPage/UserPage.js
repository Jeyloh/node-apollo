import React from "react";
import "./user-page.css";
import { GET_ME } from "../../graphql/queries";
import NoteMasonry from "../NoteMasonry/NoteMasonry";
import { useQuery } from '@apollo/react-hooks';
import AdminPanel from "./AdminPanel"; 

const UserPage = () => {
    const { loading, error, data, refetch } = useQuery(GET_ME)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : { JSON.stringify(error)}</p>;

    return (
        <div className="user-wrapper">
            <AdminPanel user={data.me} refetchUser={refetch} />
            <NoteMasonry user={data.me} refetchUser={refetch} />
        </div>
    )
}

export default UserPage;