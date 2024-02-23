import React, { useState } from 'react'
import './StyleScholarship.css'

function Scholarship({ ScholarshipTableData }) {
    const [isShowmore, SetisShowmore] = useState(false)
    // const [ScholarshipTable, setScholarshipTable] = useState({
    //     "Details": "IIT Delhi Placements 2024 Phase 1 has concluded. About 1000 students received 1050 placement offers (including pre-placement offers from 20 organizations). Students received more than 50 international offers. Some of the top recruiters included Air India, Microsoft, Texas Instruments, Goldman Sachs, Bajaj Auto etc.",
    //     "Data": [
    //         [
    //             "Particulars",
    //             "Placement Statistics 2023",
    //             "Placement Statistics 2022"
    //         ],
    //         [
    //             "No. of Offers",
    //             "1300",
    //             "1300"
    //         ],
    //         [
    //             "No. of International Offers",
    //             "1300",
    //             "1300"
    //         ],
    //         [
    //             "No. of Offers",
    //             "300",
    //             "300"
    //         ],
    //         [
    //             "No. of Offers",
    //             "300",
    //             "300"
    //         ],
    //         [
    //             "No. of Offers",
    //             "300",
    //             "300"
    //         ],
    //         [
    //             "No. of Offers",
    //             "300",
    //             "300"
    //         ],
    //         [
    //             "No. of Offers",
    //             "300",
    //             "300"
    //         ]
    //     ]
    // })
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
                        <div className='Scholarship_List'>
                            <div className='Scholarship_Details'>
                                {
                                    (ScholarshipTableData.Details) &&
                                    <p>{ScholarshipTableData.Details}</p>
                                }
                            </div>
                            {
                                (ScholarshipTableData.Data!==undefined&&ScholarshipTableData.Data.length > 0) &&
                                <div className='Scholarship_Box'>
                                    <table>
                                        <tbody>
                                            {ScholarshipTableData.Data.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {row.map((col, colIndex) => (
                                                        <td key={colIndex}>{col}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

export default Scholarship