import React, { useState } from "react";
import axios from 'axios';

const AddFaq = () => {
    const [faqQues, setFaqQues] = useState('');
    const [faqAns, setFaqAns] = useState('');
    const [quesError, setQuesError] = useState(false);
    const [ansError, setAnsError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleAdd = async () => {
        if (!faqQues) setQuesError(true);
        if (!faqAns) setAnsError(true);
        if (!faqQues || !faqAns) return false;

        try {
            setLoading(true);
            await axios.post('http://localhost:3005/gsec/faq', { ques: faqQues, ans: faqAns });
        } catch (error) {
            console.log(error)
        } finally {
            setFaqQues('');
            setFaqAns('');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor="question" className="form-label">
                    Question
                </label>
                <input
                    placeholder='Enter question'
                    style={{ borderColor: quesError ? "#e74c3c" : "" }}
                    value={faqQues}
                    onChange={(e) => {
                        const val = e.target.value;
                        setFaqQues(val);
                        if (val.length > 0) {
                            setQuesError(false);
                        } else {
                            setQuesError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='question'
                />
                {quesError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2">
                <label htmlFor="answer" className="form-label">
                    Answer
                </label>
                <input
                    placeholder='Enter answer'
                    style={{ borderColor: ansError ? "#e74c3c" : "" }}
                    value={faqAns}
                    onChange={(e) => {
                        const val = e.target.value;
                        setFaqAns(val);
                        if (val.length > 0) {
                            setAnsError(false);
                        } else {
                            setAnsError(true);
                        }
                    }}
                    type="text"
                    className="form-control"
                    id='answer'
                />
                {ansError && <div className="error-msg">Input field cannot be blank.</div>}
            </div>
            <div className="mb-2 text-center">
                <button onClick={handleAdd} className="btn btn-primary" type="button" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default AddFaq;
