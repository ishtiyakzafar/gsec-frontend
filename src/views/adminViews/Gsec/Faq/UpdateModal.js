import React, { useState } from 'react';
import axios from 'axios';

const UpdateModal = ({ item, setData }) => {
    const [faqQues, setFaqQues] = useState(item.ques);
    const [faqAns, setFaqAns] = useState(item.ans);
    const [quesError, setQuesError] = useState(false);
    const [ansError, setAnsError] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleUpdate = async () => {
        if (!faqQues) setQuesError(true);
        if (!faqAns) setAnsError(true);
        if (!faqQues || !faqAns) return false;

        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3005/gsec/faq/${item._id}`, { ques: faqQues, ans: faqAns });
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