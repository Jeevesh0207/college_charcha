import React, { useEffect, useState } from 'react';
import './StylePage2.css';
import Cookies from 'js-cookie';

function Page2({ Summary, setSummary }) {

    return (
        <div className='Page2'>
            <div className='container'>
                <div className='row Name'>
                    <p>Summary</p>
                    <textarea 
                    // value={Summary} 
                    value={Summary.join('\n')} 
                    type='text' onChange={(e) => {
                        const text=e.target.value
                        let lines = text.split(/\n+/);
                        setSummary(lines)
                    }} />
                </div>
            </div>
            
        </div>
    );
}

export default Page2;
