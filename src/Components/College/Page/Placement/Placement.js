import React, { useState } from 'react'
import './StylePlacement.css'

function Placement({ PlacementTableData }) {
    const [isShowmore, SetisShowmore] = useState(false)
    const [PlacementTable, setPlacementTable] = useState({
        "Details": "IIT Delhi Placements 2024 Phase 1 has concluded. About 1000 students received 1050 placement offers (including pre-placement offers from 20 organizations). Students received more than 50 international offers. Some of the top recruiters included Air India, Microsoft, Texas Instruments, Goldman Sachs, Bajaj Auto etc.",
        "Data": [
            [
                "Particulars",
                "Placement Statistics 2023",
                "Placement Statistics 2022"
            ],
            [
                "No. of Offers",
                "1300",
                "1300"
            ],
            [
                "No. of International Offers",
                "1300",
                "1300"
            ],
            [
                "No. of Offers",
                "300",
                "300"
            ],
            [
                "No. of Offers",
                "300",
                "300"
            ],
            [
                "No. of Offers",
                "300",
                "300"
            ],
            [
                "No. of Offers",
                "300",
                "300"
            ],
            [
                "No. of Offers",
                "300",
                "300"
            ]
        ]
    })
    const Show = () => {
        SetisShowmore(!isShowmore)
    }
    return (
        <div className='Placement' id='placementID'>
            <div className='Placement_container'>
                <div className='Placement_Top'>
                    <h1>Placement</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        <div className='Placement_List'>
                            <div className='Placement_Details'>
                                {
                                    (PlacementTableData.Details) &&
                                    <p>{PlacementTableData.Details}</p>
                                }
                            </div>
                            {
                                (PlacementTableData.Data!==undefined&&PlacementTableData.Data.length > 0) &&
                                <div className='Placement_Box'>
                                    <table>
                                        <tbody>
                                            {PlacementTableData.Data.map((row, rowIndex) => (
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

export default Placement