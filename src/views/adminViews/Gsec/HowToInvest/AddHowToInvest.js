import React, { useState } from "react";
import axios from 'axios';

const AddHowToInvest = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleAdd = async () => {
        if (!title) setTitleError(true);
        if (!description) setDescriptionError(true);
        if (!title || !description) return false;

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/howtoinvest', { title, description });
        } catch (error) {
            console.log(error)
        } finally {
            setTitle('');
            setDescription('');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    placeholder='Enter title'
                    style={{ borderColor: titleError ? "#e74c3c" : "" }}
                    value={title}
                    onChange={(e) => {
                        const val = e.target.value;
                        setTitle(val);
                        if (val.length > 0) {
                            setTitleError(false);
                        } else {
                            setTitleError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='title'
                />
                {titleError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    placeholder='Enter description'
                    style={{ borderColor: descriptionError ? "#e74c3c" : "" }}
                    value={description}
                    onChange={(e) => {
                        const val = e.target.value;
                        setDescription(val);
                        if (val.length > 0) {
                            setDescriptionError(false);
                        } else {
                            setDescriptionError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='description'
                />
                {descriptionError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2 text-center">
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddHowToInvest;
