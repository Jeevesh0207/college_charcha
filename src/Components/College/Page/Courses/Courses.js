import React, { useState } from 'react'
import './StyleCourses.css'

function Courses({CoursesData}) {
    const [isShowmore, SetisShowmore] = useState(false)
    // const [CoursesData, SetCoursesData] = useState([
    //     {
    //         "Program": "Bachelor of Technology [B.Tech]",
    //         "Duration": "4 Years",
    //         "Rating": "5",
    //         "ExamExpected": "JEE Advanced",
    //         "FeesSponsored": "5L",
    //         "FeesNonSponsored": "10L",
    //         "Specialization": "Computer Science and Engineering , Mathematics And Computing , Engineering and Computational Mechanics , Biotechnology And Biochemical Engineering",
    //         "Cutoff": "B.Tech Computer Science Engineering JEE-Advanced 2023 Cut off: 115"
    //     },
    //     {
    //         "Program": "Master of Technology [M.Tech]",
    //         "Duration": "2 Years",
    //         "Rating": "4.3",
    //         "ExamExpected": "GATE",
    //         "FeesSponsored": "5L",
    //         "FeesNonSponsored": "10L",
    //         "Specialization": " Computer Science And Engineering , Vlsi Design |Data Science , Cyber Security , Robotics Engineering , Construction Engineering And Management",
    //         "Cutoff": "B.Tech Computer Science Engineering JEE-Advanced 2023 Cut off: 115"
    //     },
    //     {
    //         "Program": "Bachelor of Technology [B.Tech]",
    //         "Duration": "4 Years",
    //         "Rating": "4.5",
    //         "ExamExpected": "JEE Advanced",
    //         "FeesSponsored": "4L",
    //         "FeesNonSponsored": "10L",
    //         "Specialization": " Computer Science and Engineering, Mathematics And Computing, Engineering and Computational Mechanic, Biotechnology And Biochemical Engineering",
    //         "Cutoff": "B.Tech Computer Science Engineering JEE-Advanced 2023 Cut off: 115"
    //     },
    //     {
    //         "Program": "Master of Technology [M.Tech]",
    //         "Duration": "2 Years",
    //         "Rating": "4.3",
    //         "ExamExpected": "GATE",
    //         "FeesSponsored": "5L",
    //         "FeesNonSponsored": "10L",
    //         "Specialization": " Computer Science And Engineering , Vlsi Design |Data Science , Cyber Security , Robotics Engineering , Construction Engineering And Management",
    //         "Cutoff": "B.Tech Computer Science Engineering JEE-Advanced 2023 Cut off: 115"
    //     },
    //     {
    //         "Program": "Bachelor of Technology [B.Tech]",
    //         "Duration": "4 Years",
    //         "Rating": "4.5",
    //         "ExamExpected": "JEE Advanced",
    //         "FeesSponsored": "4L",
    //         "FeesNonSponsored": "10L",
    //         "Specialization": " Computer Science and Engineering, Mathematics And Computing, Engineering and Computational Mechanic, Biotechnology And Biochemical Engineering",
    //         "Cutoff": "B.Tech Computer Science Engineering JEE-Advanced 2023 Cut off: 115"
    //     }
    // ])
    const Show = () => {
        SetisShowmore(!isShowmore)
    }
    return (
        <div className='Courses' id='coursesID'>
            <div className='Courses_container'>
                <div className='Courses_Top'>
                    <h1>Courses</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        (CoursesData.length > 0) &&
                        <div className='Courses_List'>
                            {
                                CoursesData.map((item, id) => (

                                    <div className='Courses_Box' key={id}>
                                        <div className='Courses_Top'>
                                            <p>{item.Program}</p>

                                        </div>
                                        <div className='Courses_Tag'>
                                            <span><i className="fa-regular fa-clock"></i>{item.Duration}</span>
                                            <span><i className="fa-solid fa-ranking-star"></i>{item.Rating}</span>
                                        </div>
                                        <div className='Courses_ExpectedExam'>
                                            <span>Exams Accepted : <span>
                                                {
                                                    (item.ExamExpected).replace(/, /g, ' | ')
                                                }
                                            </span></span>
                                        </div>
                                        <div className='Courses_Specialization'>
                                            <div className='Courses_Left'>
                                                <span>Specialization :</span>
                                            </div>
                                            <div className='Courses_Right'>
                                                <span>
                                                    {
                                                        (item.Specialization).replace(/, /g, ' | ')
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className='Courses_Specialization Courses_Cutoff'>
                                            <div className='Courses_Left'>
                                                <span>Cutoff :</span>
                                            </div>
                                            <div className='Courses_Right'>
                                                <span>
                                                    <p>{item.Cutoff}</p>
                                                </span>
                                            </div>
                                        </div>
                                        <div className='Courses_Fees'>
                                            <span>Tuition Fees (Sponsored) : {item.FeesSponsored}</span>
                                            <span>Tuition Fees (Non Sponsored) : {item.FeesNonSponsored}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div className='Show'>
                    {
                        (!isShowmore) &&
                        <div className='shadow'></div>
                    }
                    <span className='Showmore' onClick={Show}>{(isShowmore) ? 'Show Less' : 'Show more..'}</span>
                </div>
            </div>
        </div>
    )
}

export default Courses