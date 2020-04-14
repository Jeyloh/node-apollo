
import React from 'react';
import './note.css';
import { DELETE_NOTE, TOGGLE_FAVORITE, UPDATE_NOTE } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';


function Note({ note, refetch, user }) {
    console.log(note)

    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);
    const [deleteNote] = useMutation(DELETE_NOTE);
    const [updateNote] = useMutation(UPDATE_NOTE);
    const [toggleUpdate, setToggleUpdate] = React.useState(false);
    const contentRef = React.useRef();

    const handleToggleFavorite = async () => {
        try {

            await toggleFavorite({ variables: { id: note.id } })
            refetch()

        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteNote = async () => {
        try {

            await deleteNote({ variables: { id: note.id } })
            refetch()

        } catch (err) {
            console.error(err);
        }
    }
    const handleUpdateNote = async (e) => {
        e.preventDefault();
        const content = contentRef.current.value;
        try {
            await updateNote({ variables: { id: note.id, content: content } })

            setToggleUpdate(false);
            refetch()
        } catch (err) {
            console.error(err);
        }
    }

    const hasFaved = React.useMemo ( () => {
        return note.favoritedBy.some ( fav => fav.username === user.username)
    }, [note, user])
    return (
        <div key={note.id} className="note-wrapper">
            <div className="note-admin-wrapper">
                <button onClick={() => setToggleUpdate(!toggleUpdate)} className="note-btn upd">U</button>
                <button onClick={handleToggleFavorite} style={ hasFaved ? {background: "purple"} : {}} className={"note-btn fav"}>F ({note.favoriteCount})</button>
                <button onClick={handleDeleteNote} className="note-btn del">D</button>
            </div>

            {toggleUpdate ?
                <form onSubmit={handleUpdateNote}>
                    <input name="content" type="textarea" ref={contentRef} />
                    <button type="submit">Update</button>
                </form>
                :
                <p>
                    {note.content}
                </p>}

            <aside className={"author"}>
                {note.author.username}
            </aside>
        </div>
    );

}

export default Note;
