import React, { useEffect, useState } from 'react';
import './StylePage4.css';


function Page4({ Courses, setCourses }) {
    const [Data, setData] = useState({
        Program: '',
        Duration: '',
        Rating: '',
        ExamExpected: '',
        FeesSponsored: '',
        FeesNonSponsored: '',
        Specialization: ''
    })

    const [isEditing, setIsEditing] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    const AddData = () => {
        if (Data.Program.trim().length && Data.Duration.trim().length && Data.Rating.trim().length && Data.ExamExpected.trim().length && Data.FeesSponsored.trim().length && Data.FeesNonSponsored.trim().length && Data.Specialization.trim().length) {
            // console.log("Data Added")
            // setCourse(prevCourse => [...prevCourse, Data]);
            if (isEditing) {
                let newArray = [...Courses];
                newArray[editIndex] = Data;
                setCourses(newArray);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                setCourses(prevCourse => [...prevCourse, Data]);
            }
            setData({
                Program: '',
                Duration: '',
                Rating: '',
                ExamExpected: '',
                FeesSponsored: '',
                FeesNonSponsored: '',
                Cutoff:'',
                Specialization: ''
            });
        }
    }

    const DeleteData = (idToRemove) => {
        let newArray = [...Courses];
        newArray.splice(idToRemove, 1);
        setCourses(newArray)
    }

    const EditData = (idToEdit) => {
        setData(Courses[idToEdit]);
        setIsEditing(true);
        setEditIndex(idToEdit);
    }

    return (
        <div className='Page4'>
            <div className='container'>
                <div className='row Program'>
                    <p>Program</p>
                    <input value={Data.Program} type='text' placeholder='Program' onChange={(e) => {
                        setData(prevData => ({
                            ...prevData,
                            Program: e.target.value
                        }))
                    }} />
                </div>
                <div className=' DurationRating'>
                    <div className='row Duration'>
                        <p>Duration</p>
                        <input value={Data.Duration} type='text' placeholder='Duration (in years)' onChange={(e) => {
                            setData(prevData => ({
                                ...prevData,
                                Duration: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row Rating'>
                        <p>Rating</p>
                        <input value={Data.Rating} type='text' placeholder='Between (0 to 5)' onChange={(e) => {
                            setData(prevData => ({
                                ...prevData,
                                Rating: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='row ExamExpected'>
                    <p>Exams Accepted</p>
                    <input value={Data.ExamExpected} type='text' placeholder='Exam Expected' onChange={(e) => {
                        setData(prevData => ({
                            ...prevData,
                            ExamExpected: e.target.value
                        }))
                    }} />
                </div>
                <div className=' Fees'>
                    <div className='row Sponsored'>
                        <p>Tuition Fees (Sponsored)</p>
                        <input value={Data.FeesSponsored} type='text' placeholder='Fees for Sponsored' onChange={(e) => {
                            setData(prevData => ({
                                ...prevData,
                                FeesSponsored: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row NonSponsored'>
                        <p>Tuition Fees (Non Sponsored)</p>
                        <input value={Data.FeesNonSponsored} type='text' placeholder='Fees for Non Sponsored' onChange={(e) => {
                            setData(prevData => ({
                                ...prevData,
                                FeesNonSponsored: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='row CuttOff'>
                    <p>Cutoff</p>
                    <input value={Data.Cutoff} type='text' placeholder='Cutoff' onChange={(e) => {
                        setData(prevData => ({
                            ...prevData,
                            Cutoff: e.target.value
                        }))
                    }} />
                </div>
                <div className='row Specialization'>
                    <p>Specialization</p>
                    <input value={Data.Specialization} type='text' placeholder='Specialization' onChange={(e) => {
                        setData(prevData => ({
                            ...prevData,
                            Specialization: e.target.value
                        }))
                    }} />
                </div>
                <div className='Add-Btn'>
                    {/* <button onClick={AddData}>Add</button> */}
                    <button onClick={AddData}>{isEditing ? 'Update' : 'Add'}</button>
                </div>
            </div>
            {
                (Courses.length > 0) &&
                <div className='container List'>
                    {
                        Courses.map((item, id) => (

                            <div className='Box' key={id}>
                                <div className='Top'>
                                    <p>{item.Program}</p>
                                    <div className='Box-AD'>
                                        <i className="fa-solid fa-trash" onClick={() => { DeleteData(id) }}></i>
                                        <i className="fa-solid fa-edit" onClick={() => { EditData(id) }}></i>
                                    </div>

                                </div>
                                <div className='Tag'>
                                    <span><i className="fa-regular fa-clock"></i>{item.Duration}</span>
                                    <span><i className="fa-solid fa-ranking-star"></i>{item.Rating}</span>
                                </div>
                                <div className='ExpectedExam'>
                                    <span>Exams Accepted : <span>
                                        {
                                            (item.ExamExpected).replace(/, /g, ' | ')
                                        }
                                    </span></span>
                                </div>
                                <div className='Specialization'>
                                    <div className='Left'>
                                        <span>Specialization :</span>
                                    </div>
                                    <div className='Right'>
                                        <span>
                                            {
                                                (item.Specialization).replace(/, /g, ' | ')
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className='Specialization Cutoff'>
                                    <div className='Left'>
                                        <span>Cutoff :</span>
                                    </div>
                                    <div className='Right'>
                                        <span>
                                            <p>{item.Cutoff}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className='Fees'>
                                    <span>Tuition Fees (Sponsored) : {item.FeesSponsored}</span>
                                    <span>Tuition Fees (Non Sponsored) : {item.FeesNonSponsored}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default Page4;
