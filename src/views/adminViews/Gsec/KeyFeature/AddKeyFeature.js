import React, { useState } from "react";
import axios from 'axios';

const AddKeyFeature = () => {
    const [keyFeature, setKeyFeature] = useState('');
    const [keyFeatureError, setKeyFeatureError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!keyFeature) return setKeyFeatureError(true);

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/keyfeature', { keyFeature });
        } catch (error) {
            console.log(error)
        } finally {
            setKeyFeature('');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor="KeyFeatures" className="form-label">
                    KeyFeatures
                </label>
                <input
                    placeholder='Enter KeyFeatures'
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
                    id='KeyFeatures'
                />
                {keyFeatureError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2 text-center">
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddKeyFeature;
