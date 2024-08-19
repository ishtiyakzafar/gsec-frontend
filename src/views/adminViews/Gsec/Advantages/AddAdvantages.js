import React, { useState } from "react";
import axios from 'axios';

const AddAdvantages = () => {
    const [advantage, setAdvantage] = useState('');
    const [advantageError, setAdvantageError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        if (!advantage) return setAdvantageError(true);

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/advantage', { advantage });
        } catch (error) {
            console.log(error)
        } finally {
            setAdvantage('');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor="advantages" className="form-label">
                    Advantages
                </label>
                <input
                    placeholder='Enter advantages'
                    style={{ borderColor: advantageError ? "#e74c3c" : "" }}
                    value={advantage}
                    onChange={(e) => {
                        const val = e.target.value;
                        setAdvantage(val);
                        if (val.length > 0) {
                            setAdvantageError(false);
                        } else {
                            setAdvantageError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='advantages'
                />
                {advantageError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2 text-center">
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddAdvantages;
