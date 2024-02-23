import React, { useEffect, useState } from 'react';
import './StylePage8.css';
import Cookies from 'js-cookie';

function Page8({ FAQ, setFAQ }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const OpenAnswer = (index) => {
        const AnsDown = document.getElementById(`Answer_Box${index}`)
        const DownArrow = document.getElementById(`Down_Arrow${index}`)
        if (AnsDown.style.display === "none" || AnsDown.style.display === "") {
            AnsDown.style.display = "flex"
            DownArrow.className = 'fa-solid fa-chevron-up'
        } else {
            AnsDown.style.display = "none"
            DownArrow.className = 'fa-solid fa-chevron-down'
        }
    }

    const AddData = () => {
        if (isEditing) {
            let newList = [...FAQ]
            newList[editIndex] = { question, answer }
            setFAQ(newList)
            setIsEditing(false)
            setEditIndex(null)
        } else {
            setFAQ([...FAQ, { question, answer }])
        }
        setQuestion('')
        setAnswer('')
    }

    const EditData = (index) => {
        setQuestion(FAQ[index].question)
        setAnswer(FAQ[index].answer)
        setIsEditing(true)
        setEditIndex(index)
    }

    const DeleteData = (index) => {
        let newList = [...FAQ]
        newList.splice(index, 1)
        setFAQ(newList)
    }

    return (
        <div className='Page8'>
            <div className='container'>
                <div className='row Question'>
                    <p>Question</p>
                    <input value={question} onChange={(e) => setQuestion(e.target.value)} type='text' />
                </div>
                <div className='row Answer'>
                    <p>Answer</p>
                    <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' />
                </div>
                <div className='Add-Btn'>
                    <button onClick={AddData}>{isEditing ? 'Update' : 'Add'}</button>
                </div>
            </div>
            {
                (FAQ.length > 0) &&
                <div className='container List'>
                    {FAQ.map((item, index) => (
                        <div className='Box' key={index}>
                            <div className='Question'>
                                <div className='Left'>
                                    <p>Ques.</p>
                                </div>
                                <div className='Right'>
                                    <p>{item.question}</p>
                                    <div className='Box-AD'>
                                        <i className="fa-solid fa-chevron-down" onClick={()=>{
                                            OpenAnswer(index)
                                        }} id={`Down_Arrow${index}`}></i>
                                        <i className="fa-solid fa-trash" onClick={() => DeleteData(index)}></i>
                                        <i className="fa-solid fa-edit" onClick={() => EditData(index)}></i>
                                    </div>
                                </div>
                            </div>
                            <div className='Answer' id={`Answer_Box${index}`}>
                                <div className='Left'>
                                    <p>Ans.</p>
                                </div>
                                <div className='Right'>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Page8;
