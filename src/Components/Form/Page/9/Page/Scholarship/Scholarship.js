import React, { useState } from 'react'
// import './StyleScholarship.css'

function Scholarship({ScholarshipTable}) {
    const [isShowmore, SetisShowmore] = useState(false)
   
    const Show = () => {
        SetisShowmore(!isShowmore)
    }
    return (
        <div className='Scholarship' id='scholarshipID'>
            <div className='Scholarship_container'>
                <div className='Scholarship_Top'>
                    <h1>Scholarship</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        (ScholarshipTable.Data && ScholarshipTable.Data.length > 0) &&
                        <div className='Scholarship_List'>
                            <div className='Scholarship_Details'>
                                <p>{ScholarshipTable.Details}</p>
                            </div>
                            <div className='Scholarship_Box'>
                                <table>
                                    <tbody>
                                        {ScholarshipTable.Data.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((col, colIndex) => (
                                                    <td key={colIndex}>{col}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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

export default Scholarship