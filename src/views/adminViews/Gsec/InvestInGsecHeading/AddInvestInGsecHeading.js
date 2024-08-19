import React, { useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

const AddInvestInGsecHeading = () => {
    const [heading, setHeading] = useState('');
    const [headingError, setHeadingError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!heading) return setHeadingError(true);

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/investingsecheading', { heading });
        } catch (error) {
            Swal.fire(error.response.data.message);
        } finally {
            setHeading('');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor="heading" className="form-label">
                    Heading
                </label>
                <textarea
                    placeholder='Enter heading'
                    style={{ borderColor: headingError ? "#e74c3c" : "" }}
                    value={heading}
                    onChange={(e) => {
                        const val = e.target.value;
                        setHeading(val);
                        if (val.length > 0) {
                            setHeadingError(false);
                        } else {
                            setHeadingError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='heading'
                />
                {headingError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2 text-center">
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddInvestInGsecHeading;
