import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ item, setData }) => {
    const [description, setDescription] = useState(item.description);
    const [descriptionError, setDescriptionError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleUpdate = async () => {
        if (!description) return setDescriptionError(true);

        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3005/gsec/tbilldetail/${item._id}`, { description });
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
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
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