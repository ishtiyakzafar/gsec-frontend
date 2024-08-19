import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ item, setData }) => {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleUpdate = async () => {
        if (!title) setTitleError(true);
        if (!description) setDescriptionError(true);
        if (!title || !description) return false;

        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3005/gsec/gsecsfeaturetabledata/${item._id}`, { title, description });
            setData((prev) => {
                const index = prev.findIndex((val) => val._id === item._id);
                prev[index] = res.data;
                return [...prev];
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button type="button" className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`}>
                Update
            </button>

            <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${item._id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`exampleModalLabel${item._id}`}>Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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
                                <button onClick={handleUpdate} className="btn btn-primary" type="button" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UpdateModal;