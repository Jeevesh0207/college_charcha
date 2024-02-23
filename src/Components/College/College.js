import React, { useEffect, useState } from 'react'
import './StyleCollege.css'
import Navbar from '../Navbar/Navbar'
import { Banner, Menu, Summary, Affilation, Youtube, Admission, Courses, Scholarship, Placement, FAQ } from './Page'
import Footer from "../Footer/Footer"
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'

function College() {
    const Navigate=useNavigate()
    const location = useLocation();
    // ------------------------Variable Page 1---------------------------
    const [BasicData, setBasicData] = useState({
        Name: '',
        Email: '',
        Estd: '',
        NAAC: '',
        Phone: '',
        Website: '',
        Rating: '',
        State: '',
        Country: '',
        LocationLink: '',
        YoutubeLink: '',
        Broucher: '',
        bannerImage: '',
        logoImage: '',
    })
    // ------------------------Variable Page 2---------------------------
    const [SummaryData, setSummary] = useState([])

    // ------------------------Variable Page 3---------------------------
    const [AffilationData, setAffilation] = useState([])

    // ------------------------Variable Page 4---------------------------
    const [CoursesData, setCourses] = useState([])

    // ------------------------Variable Page 5---------------------------
    const [ProcedureData, setProcedure] = useState([])

    // ------------------------Variable Page 6---------------------------
    const [PlacementTableData, setPlacementTable] = useState({
        Details: '',
        Data: []
    })

    // ------------------------Variable Page 7---------------------------
    const [ScholarshipTableData, setScholarshipTable] = useState({
        Details: '',
        Data: []
    })

    // ------------------------Variable Page 8---------------------------
    const [FAQData, setFAQ] = useState([])


    useEffect(() => {
        const GetAllCollegeList = async () => {
            const college_id=localStorage.getItem('college_id')
            const CollegeList=JSON.parse(localStorage.getItem("CollegeList"))
            const college_name=location.pathname.split('/')[2]
            console.log(college_name)
            if(CollegeList[college_name]){
                console.log("College ID exists:", college_id);
            }else{
                Navigate('/')
            }
            await axios.post(process.env.REACT_APP_URL + '/search_college', { id: college_id }).then((res) => {
                console.log(res.data)
                const parseData = res.data
                setBasicData(parseData.BasicData ||
                {
                    Name: '',
                    Email: '',
                    Estd: '',
                    NAAC: '',
                    Phone: '',
                    Website: '',
                    Rating: '',
                    State: '',
                    Country: '',
                    LocationLink: '',
                    YoutubeLink: '',
                    Broucher: '',
                    bannerImage: '',
                    logoImage: '',
                })
                setSummary(parseData.Summary || [])
                setAffilation(parseData.Affilation || [])
                setCourses(parseData.Courses || [])
                setProcedure(parseData.Procedure || [])
                setPlacementTable(parseData.PlacementTable || [])
                setScholarshipTable(parseData.ScholarshipTable || [])
                setFAQ(parseData.FAQ || '')

            }).catch((err) => {
                console.log(err)
            })
        }
        GetAllCollegeList()
        
    }, [])


    return (
        <>
            <Navbar />
            <div className='College'>
                <Banner BasicData={BasicData} />
                <div className='container'>
                    <div className='Left' id='Left_Menu'>
                        <Menu />
                    </div>
                    <div className='Right'>
                        <Summary SummaryData={SummaryData} />
                        <Affilation AffilationData={AffilationData} />
                        <Youtube YoutubeLinkData={BasicData.YoutubeLink} />
                        <Admission AdmissionData={ProcedureData} />
                        <Courses CoursesData={CoursesData} />
                        <Scholarship ScholarshipTableData={ScholarshipTableData} />
                        <Placement PlacementTableData={PlacementTableData} />
                        <FAQ FAQData={FAQData} />
                    </div>
                </div>
            </div>
            <div style={{
                paddingTop: '10px',
                backgroundColor: '#f3f4fa'
            }}>
                <Footer />
            </div>
        </>
    )
}

export default College