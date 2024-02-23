import React, { useState } from 'react';
import './StylePage7.css';


function Page7({ ScholarshipTable, setScholarshipTable }) {
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
            setScholarshipTable(prevData => ({
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
        setData(ScholarshipTable.Data);
        setIsEditing(true);
    };

    const handleDimensionChange = () => {
        if (isEditing) {
            let newData = Array(rows).fill().map(() => Array(cols).fill(''));
            for (let i = 0; i < Math.min(ScholarshipTable.Data.length, newData.length); i++) {
                for (let j = 0; j < Math.min(ScholarshipTable.Data[0].length, newData[0].length); j++) {
                    if (ScholarshipTable.Data[i][j]) {
                        newData[i][j] = ScholarshipTable.Data[i][j];
                    } else {
                        newData[i][j] = '';
                    }
                }
            }
            setData(newData);
        } else {
            setData(Array(rows).fill().map(() => Array(cols).fill('')));
        }
    };

    return (
        <div className='Page7'>
            <div className='container'>
                <div className='row Name'>
                    <p>Details</p>
                    <input value={ScholarshipTable.Details} type='text' onChange={(e) => {
                        setScholarshipTable(prevData => ({
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
                                // value={(isEditing) ? ScholarshipTable[rowIndex][colIndex] : data[rowIndex][colIndex]} 
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
                (ScholarshipTable.Data && ScholarshipTable.Data.length > 0) &&
                <div className='container List'>
                    <div className='Add-Btn'>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={() => {
                            setIsEditing(false)
                            setScholarshipTable({
                                Details: '',
                                Data: []
                            })
                        }} ><i className="fa-solid fa-trash" ></i></button>

                    </div>
                    <div className='Details'>
                        <p>{ScholarshipTable.Details}</p>
                    </div>
                    <div className='Box'>
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
    );
}

export default Page7;
