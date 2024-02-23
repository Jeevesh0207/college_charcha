import React, { useState } from 'react'
// import './StylePlacement.css'

function Placement({PlacementTable}) {
    const [isShowmore, SetisShowmore] = useState(false)
   
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
                        (PlacementTable.Data && PlacementTable.Data.length > 0) &&
                        <div className='Placement_List'>
                            <div className='Placement_Details'>
                                <p>{PlacementTable.Details}</p>
                            </div>
                            <div className='Placement_Box'>
                                <table>
                                    <tbody>
                                        {PlacementTable.Data.map((row, rowIndex) => (
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

export default Placement