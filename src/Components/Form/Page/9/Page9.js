import React, { useEffect, useState } from 'react';
import './StylePage9.css';
import College from './College';
function Page9({BasicData,SummaryData,AffilationData,CoursesData,AdmissionData,ScholarshipTable,PlacementTable,FAQData}) {
   
    
    return (
        <div className='Page9'>
            <div className='final_container'>
                <College
                    BasicData={BasicData}
                    SummaryData={SummaryData}
                    AffilationData={AffilationData}
                    CoursesData={CoursesData}
                    AdmissionData={AdmissionData}
                    ScholarshipTable={ScholarshipTable}
                    PlacementTable={PlacementTable}
                    FAQData={FAQData}
                />
            </div>
        </div>
    );
}

export default Page9;
