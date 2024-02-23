import React, { useEffect, useState } from 'react';
import './StylePage3.css';
import Cookies from 'js-cookie';


function Page3({ Affilation, setAffilation }) {
    return (
        <div className='Page3'>
            <div className='container'>
                <div className='row Name'>
                    <p>Affilation</p>
                    <textarea 
                    // value={Affilation} 
                    value={Affilation.join('\n')} 
                    type='text' 
                    onChange={(e) => { 
                        const text=e.target.value
                        let lines = text.split(/\n+/);
                        setAffilation(lines) 
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Page3;
