import React from 'react';
import { CREATE_NOTE } from "../../graphql/mutations";
import { useMutation } from '@apollo/react-hooks';

const NotePanel = ({ refetch }) => {
    const [createNote] = useMutation(CREATE_NOTE);
    const [newNote, setNewNote] = React.useState(false);

    const contentRef = React.useRef();

    const handleSubmit = async e => {
        e.preventDefault();
        const content = contentRef.current.value;
        try {
            await createNote({ variables: { content } })
            refetch()
        } catch (err) {
            console.error(err)
        }
        
        setNewNote(false)
    }

    if (newNote) {
        return (
            <div className="new-note-wrapper">
                <form onSubmit={handleSubmit}>
                    <input name="content" type="textarea" ref={contentRef} />
                    <button type="submit">Add Note</button>
                </form>
            </div>
        )
    }

    return (
        <>
            <button className="sync-btn" onClick={() => setNewNote(true)}>+ New</button>
            <button className="sync-btn" onClick={() => refetch()}>Sync</button>
        </>
    )
}

export default NotePanel;