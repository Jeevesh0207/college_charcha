import React, { useState } from 'react'
import './StyleFAQ.css'

function FAQ({FAQData}) {
    const [isShowmore, SetisShowmore] = useState(false)
    // const [FAQ, setFAQ] = useState([
    //     {
    //         "question": "IIT Delhi ( Amazing Journey of IIT Delhi).",
    //         "answer": "This year, there are approximately 150 students enrolled in the mathematics and computing branch. It has become a highly sought-after course after computer science. As a second-year student, I don't have access to the statistics regarding the highest and lowest packages, but you can always find that information on the IITD website."
    //     },
    //     {
    //         "question": "IIT Delhi ( Amazing Journey of IIT Delhi).",
    //         "answer": "This year, there are approximately 150 students enrolled in the mathematics and computing branch. It has become a highly sought-after course after computer science. As a second-year student, I don't have access to the statistics regarding the highest and lowest packages, but you can always find that information on the IITD website."
    //     },
    //     {
    //         "question": "IIT Delhi ( Amazing Journey of IIT Delhi).",
    //         "answer": "This year, there are approximately 150 students enrolled in the mathematics and computing branch. It has become a highly sought-after course after computer science. As a second-year student, I don't have access to the statistics regarding the highest and lowest packages, but you can always find that information on the IITD website."
    //     },
    //     {
    //         "question": "IIT Delhi ( Amazing Journey of IIT Delhi).",
    //         "answer": "This year, there are approximately 150 students enrolled in the mathematics and computing branch. It has become a highly sought-after course after computer science. As a second-year student, I don't have access to the statistics regarding the highest and lowest packages, but you can always find that information on the IITD website."
    //     }
    // ])
    const Show = () => {
        SetisShowmore(!isShowmore)
    }

    const OpenAnswer = (index) => {
        const AnsDown = document.getElementById(`FAQ_Answer_Box${index}`)
        const DownArrow = document.getElementById(`FAQ_Down_Arrow${index}`)
        if (AnsDown.style.display === "none" || AnsDown.style.display === "") {
            AnsDown.style.display = "flex"
            DownArrow.className = 'fa-solid fa-chevron-up'
        } else {
            AnsDown.style.display = "none"
            DownArrow.className = 'fa-solid fa-chevron-down'
        }
    }

    return (
        <div className='FAQ' id='faqID'>
            <div className='FAQ_container'>
                <div className='FAQ_Top'>
                    <h1>FAQ</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        (FAQData.length > 0) &&
                        <div className='FAQ_List'>
                            {FAQData.map((item, index) => (
                                <div className='FAQ_Box' key={index}>
                                    <div className='FAQ_Question'>
                                        <div className='FAQ_Left'>
                                            <p>Ques.</p>
                                        </div>
                                        <div className='FAQ_Right'>
                                            <p>{item.question}</p>
                                            <div className='FAQ_Box-AD'>
                                                <i className="fa-solid fa-chevron-down" onClick={() => {
                                                    OpenAnswer(index)
                                                }} id={`FAQ_Down_Arrow${index}`}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='FAQ_Answer' id={`FAQ_Answer_Box${index}`}>
                                        <div className='FAQ_Left'>
                                            <p>Ans.</p>
                                        </div>
                                        <div className='FAQ_Right'>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className='Show'>
                    {
                        (!isShowmore) &&
                        <div className='shadow'></div>
                    }
                    <span onClick={Show}>{(isShowmore) ? 'Show Less' : 'Show more..'}</span>
                </div>
            </div>
        </div>
    )
}

export default FAQ