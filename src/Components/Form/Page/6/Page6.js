import React, { useState } from 'react';
import './StylePage6.css';


function Page6({ PlacementTable, setPlacementTable }) {
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = e.target.value;
        setData(newData);
    };

    const handleSubmit = () => {
        if (data.flat().every(cell => cell !== '')) {
            setPlacementTable(prevData => ({
                ...prevData,
                Data: data
            }));
            setData([])
            setIsEditing(false);
        } else {
            alert('Empty table cannot be added');
        }
        setIsEditing(false)
    };

    const handleEdit = () => {
        setData(PlacementTable.Data);
        setIsEditing(true);
    };

    const handleDimensionChange = () => {
        // console.log(isEditing)
        if (isEditing) {
            let newData = Array(rows).fill().map(() => Array(cols).fill('')); // Create a new empty table
            for (let i = 0; i < Math.min(PlacementTable.Data.length, newData.length); i++) {
                for (let j = 0; j < Math.min(PlacementTable.Data[0].length, newData[0].length); j++) {
                    if (PlacementTable.Data[i][j]) {
                        newData[i][j] = PlacementTable.Data[i][j]; // Fill with PlacementTable data if it exists
                    } else {
                        newData[i][j] = ''; // Fill with empty string otherwise
                    }
                }
            }
            setData(newData);
        } else {
            setData(Array(rows).fill().map(() => Array(cols).fill('')));
        }

    };


    return (
        <div className='Page6'>
            <div className='container'>
                <div className='row Name'>
                    <p>Details</p>
                    <input value={PlacementTable.Details} type='text' onChange={(e) => {
                        setPlacementTable(prevData => ({
                            ...prevData,
                            Details: e.target.value
                        }))
                    }} />
                </div>
                <div className='TakeRowCol'>
                    <div className='row Name'>
                        <p>Rows</p>
                        <input type="number"
                            value={rows}
                            onChange={(e) => {
                                const num = parseInt(e.target.value);
                                if (num >= 0) {
                                    setRows(num);
                                } else {
                                    setRows('');
                                }
                            }}
                            placeholder="Enter number of rows" />
                    </div>
                    <div className='row Name'>
                        <p>Coloums</p>
                        <input type="number" className='row'
                            value={cols}
                            onChange={(e) => {
                                const num = parseInt(e.target.value);
                                if (num >= 0) {
                                    setCols(num);
                                } else {
                                    setCols('');
                                }
                            }}
                            placeholder="Enter number of columns" />
                    </div>
                </div>
                <div className='Create-Btn'>
                    <button onClick={handleDimensionChange}>Create Table</button>
                </div>


                {data.map((row, rowIndex) => (
                    <div className='row Table' key={rowIndex}>
                        {row.map((col, colIndex) => (
                            <input
                                // value={(isEditing) ? PlacementTable[rowIndex][colIndex] : data[rowIndex][colIndex]} 
                                value={data[rowIndex][colIndex]}
                                key={colIndex} type="text" onChange={(e) => handleInputChange(e, rowIndex, colIndex)} />
                        ))}
                    </div>
                ))}
                {
                    (data.length > 0) &&
                    <div className='Add-Btn'>
                        <button onClick={handleSubmit}>{(isEditing) ? 'Update' : 'Add'}</button>
                    </div>
                }
            </div>
            {
                (PlacementTable.Data && PlacementTable.Data.length > 0) &&
                <div className='container List'>
                    <div className='Add-Btn'>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={() => {
                            setIsEditing(false)
                            setPlacementTable({
                                Details: '',
                                Data: []
                            })

                        }} ><i className="fa-solid fa-trash" ></i></button>

                    </div>
                    <div className='Details'>
                        <p>{PlacementTable.Details}</p>
                    </div>
                    <div className='Box'>
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
    );
}

export default Page6;
