import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ item, setData }) => {
    const [keyFeature, setKeyFeature] = useState(item.keyFeature);
    const [keyFeatureError, setKeyFeatureError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleUpdate = async () => {
        if (!keyFeature) return setKeyFeatureError(true);

        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3005/gsec/keyfeature/${item._id}`, { keyFeature });
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
                                <label htmlFor="keyfeature" className="form-label">
                                    Key Features
                                </label>
                                <input
                                    placeholder='Enter keyfeature'
                                    style={{ borderColor: keyFeatureError ? "#e74c3c" : "" }}
                                    value={keyFeature}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setKeyFeature(val);
                                        if (val.length > 0) {
                                            setKeyFeatureError(false);
                                        } else {
                                            setKeyFeatureError(true);
                                        }
                                    }}
                                    type="text"
                                    className="form-control"
                                    id='keyfeature'
                                />
                                {keyFeatureError && <div className="error-msg">Input field cannot be blank.</div>}
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