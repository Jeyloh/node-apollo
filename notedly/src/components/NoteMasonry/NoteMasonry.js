import React from 'react';
import Note from '../Note/Note';
import Masonry from 'react-masonry-component';
import "./note-masonry.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_NOTES } from "../../graphql/queries";
import NotePanel from "./NotePanel";

const LoadErrorRender = ({ request, refetch, user }) => {
  if (request.error) return <div key="err">error</div>
  if (request.loading) return <div key="load">loading ...</div>
  return (
    <Masonry className="note-masonry">
      {request.data.notes.map((note) => <Note user={user} key={note.id} refetch={refetch} note={note} />)}
    </Masonry>
  )
}

function NoteMasonry({ user, refetchUser }) {
  console.log(user);
  const getNotes = useQuery(GET_NOTES, {
    pollInterval: 0,
  });

  const refetchAll = () => {
    getNotes.refetch();
    refetchUser();
  }

  return (
    <div className="note--masonry-wrapper">
      <NotePanel refetch={refetchAll} />

      <h3>Favorites</h3>
      <Masonry className="note-masonry">
        {user.favorites.map((note) => <Note user={user} refetch={refetchAll} note={note} />)}
      </Masonry>

      {/* <Masonry className="note-masonry">
        {data.notes.map((note) => <Note refetch={refetch} note={note} />)}
      </Masonry> */}

      <h3>Notes</h3>
      <Masonry className="note-masonry">
        {user.notes.map((note) => <Note user={user} refetch={refetchAll} note={note} />)}
      </Masonry>

      <h3>All Notes</h3>

      <LoadErrorRender refetch={refetchAll} user={user} request={getNotes} />

    </div>
  );
}

export default NoteMasonry;
