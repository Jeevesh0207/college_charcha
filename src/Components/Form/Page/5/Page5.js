import React, { useState } from 'react';
import './StylePage5.css';

function Page5({ Procedure, setProcedure }) {
    const [currProcedure, setcurrProcedure] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    const AddData = () => {
        if(isEditing) {
            let newArray = [...Procedure];
            newArray[editIndex] = currProcedure;
            setProcedure(newArray);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setProcedure(prevData => ([...prevData, currProcedure]))
        }
        setcurrProcedure('');
    }

    const DeleteData=(idToRemove)=>{
        let newArray = [...Procedure];
        newArray.splice(idToRemove, 1);
        setProcedure(newArray)
    }

    const EditData=(idToEdit)=>{
        setcurrProcedure(Procedure[idToEdit]);
        setIsEditing(true);
        setEditIndex(idToEdit);
    }

    return (
        <div className='Page5'>
            <div className='container'>
                <div className='row Name'>
                    <p>Admission Procedure</p>
                    <input value={currProcedure} type='text' placeholder='Procedure' onChange={(e) => { setcurrProcedure(e.target.value) }} />
                </div>
                <div className='Add-Btn'>
                    <button onClick={()=>{(currProcedure.trim().length) && AddData()}}>{isEditing ? 'Update' : 'Add'}</button>
                </div>
            </div>
            {
                (Procedure.length > 0) &&
                <div className='container List'>
                    {
                        Procedure.map((item, id) => (
                            <div className='Box' key={id}>
                                <p>{item}</p>
                                <div className='Box-AD'>
                                <i className="fa-solid fa-edit" onClick={()=>{EditData(id)}}></i>
                                <i className="fa-solid fa-trash" onClick={()=>{DeleteData(id)}}></i>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default Page5;
