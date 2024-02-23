import React, { useEffect, useState } from 'react'
import { Banner, Menu, Summary, Affilation, Youtube, Admission, Courses, Scholarship, Placement, FAQ } from './Page'

function College({BasicData,SummaryData,AffilationData,CoursesData,AdmissionData,ScholarshipTable,PlacementTable,FAQData}) {
    return (
        <>
            <div className='College'>
                <Banner BasicData={BasicData} />
                <div className='container'>
                    <div className='Left' id='Left_Menu'>
                        <Menu />
                    </div>
                    <div className='Right'>
                        <Summary SummaryData={SummaryData} />
                        <Affilation AffilationData={AffilationData} />
                        <Youtube YoutubeLink={BasicData.YoutubeLink}/>
                        <Admission AdmissionData={AdmissionData} />
                        <Courses CoursesData={CoursesData} />
                        <Scholarship ScholarshipTable={ScholarshipTable}/>
                        <Placement PlacementTable={PlacementTable}/>
                        <FAQ FAQData={FAQData}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default College