import React, { useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

const AddBondDetail = () => {
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!description) return setDescriptionError(true);

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/bonddetail', { description });
        } catch (error) {
            Swal.fire(error.response.data.message);
        } finally {
            setDescription('');
            setLoading(false);
        }
    }

    return (
        <>
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
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddBondDetail;
