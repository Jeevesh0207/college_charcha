import React from 'react'
import './StyleAdmission.css'

function Admission({AdmissionData}) {
    const Data = [
        {
            step: "To register, simply sign up and pay a ₹500 registration fee."
        },
        {
            step: "Next step is to fill the online application form and upload relevant documents."
        },
        {
            step:"Now, you have to pay the fees relevant to the program you’re opting"
        },
        {
            step:"The university will verify the documents and notify you for further procedures."
        }

    ]
    return (
        <div className='Admission' id='admissionID'>
            <div className='Admission_container'>
                <div className='Admission_Top'>
                    <h1>Admission Process</h1>
                </div>
                <div className='Process'>
                    {
                        AdmissionData.map((item, index) => (
                            <div className='Step_Box' key={index}>
                                <div className={(index%2==0)?'Step_container':'Step_container reverse'}>
                                    <div className='Step_container_Left'>
                                        <p>{item}</p>
                                    </div>
                                    <div className='Step_container_Right'>
                                        <h1>{index+1 < 10 ? `0${index+1}` : index+1}</h1>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Admission
