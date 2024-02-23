import React, { useEffect, useState } from 'react'
import './StyleForm.css'
import Navbar from '../Navbar/Navbar'
import { Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9 } from './Page'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '../../Hook/FormData';
import { Loading } from "../index"
import { ToastContainer, toast } from 'react-toastify';

function Form() {
    const FormAuth = useForm()
    const Navigate = useNavigate()
    const location = useLocation();
    const [currentIndex, setcurrentIndex] = useState(1)
    const [isPrevShow, setisPrevShow] = useState(false)
    const [is_from_update, setis_from_update] = useState(false)
    const [isLoading, setisLoading] = useState(false)

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
        bannerObj: '',
        logoObj: '',
    })
    // ------------------------Variable Page 2---------------------------
    const [Summary, setSummary] = useState([])

    // ------------------------Variable Page 3---------------------------
    const [Affilation, setAffilation] = useState([])

    // ------------------------Variable Page 4---------------------------
    const [Courses, setCourses] = useState([])

    // ------------------------Variable Page 5---------------------------
    const [Procedure, setProcedure] = useState([])

    // ------------------------Variable Page 6---------------------------
    const [PlacementTable, setPlacementTable] = useState({
        Details: '',
        Data: []
    })

    // ------------------------Variable Page 7---------------------------
    const [ScholarshipTable, setScholarshipTable] = useState({
        Details: '',
        Data: []
    })

    // ------------------------Variable Page 8---------------------------
    const [FAQ, setFAQ] = useState([])

    const notify = (type) => {
        switch (type) {
            case 'Add Success':
                toast.success("Data Added Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'Update Success':
                toast.success("Data Updated Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'err':
                toast.error("Something Went Wrong..", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            default:
                toast("Try Again....", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
        }

    }


    useEffect(() => {
        const FetchUpdateCollegeData = async (college_id) => {
            await axios.post(process.env.REACT_APP_URL + '/search_college', { id: college_id }).then((res) => {
                const parseData = res.data
                setBasicData(parseData.BasicData)
                setSummary(parseData.Summary || [])
                setAffilation(parseData.Affilation || [])
                setCourses(parseData.Courses || [])
                setProcedure(parseData.Procedure || [])
                setPlacementTable(parseData.PlacementTable ||
                {
                    Details: '',
                    Data: []
                })
                setScholarshipTable(parseData.ScholarshipTable ||
                {
                    Details: '',
                    Data: []
                })
                setFAQ(parseData.FAQ || [])
                localStorage.setItem('Data', JSON.stringify(res.data))
            }).catch((err) => {
                console.log(err)
            })
        }
        const update_id = JSON.parse(localStorage.getItem('update_id'))
        if (update_id.is_from_update) {
            setis_from_update(true)
            const CollegeList = JSON.parse(localStorage.getItem("CollegeList"))
            const college_id = location.pathname.split('/')[3]
            if (!Object.values(CollegeList).some(college => college.id === college_id)) {
                Navigate('/')
            }
            if (update_id.college_id)
                FetchUpdateCollegeData(update_id.college_id)
        } else {
            const Data = localStorage.getItem('Data')
            if (Data) {
                const parseData = JSON.parse(Data)
                const { bannerImage, logoImage, Broucher, ...rest } = parseData.BasicData || {}
                setBasicData(rest);
                setSummary(parseData.Summary || [])
                setAffilation(parseData.Affilation || [])
                setCourses(parseData.Courses || [])
                setProcedure(parseData.Procedure || [])
                setPlacementTable(parseData.PlacementTable || {
                    Details: '',
                    Data: []
                })
                setScholarshipTable(parseData.ScholarshipTable || {
                    Details: '',
                    Data: []
                })
                setFAQ(parseData.FAQ || [])
            }
        }
    }, [])

    const NoofSteps = [
        {
            id: 1,
            title: 'Basic'
        },
        {
            id: 2,
            title: 'Summary'
        },
        {
            id: 3,
            title: 'Affilation'
        },
        {
            id: 4,
            title: 'Course'
        },
        {
            id: 5,
            title: 'Admission Procedure'
        },
        {
            id: 6,
            title: 'Placement Data'
        },
        {
            id: 7,
            title: 'Scolarship'
        },
        {
            id: 8,
            title: 'FAQ'
        },
        {
            id: 9,
            title: 'Preview'
        },

    ]
    const NextPage = (id) => {
        const Obj = {
            BasicData: BasicData,
            Summary: Summary,
            Affilation: Affilation,
            Courses: Courses,
            Procedure: Procedure,
            PlacementTable: PlacementTable,
            ScholarshipTable: ScholarshipTable,
            FAQ: FAQ
        }
        localStorage.setItem('Data', JSON.stringify(Obj))
        setcurrentIndex(prevIndex => {
            const newIndex = prevIndex + id;
            if (newIndex > 1) {
                setisPrevShow(true);
            } else {
                setisPrevShow(false);
            }

            if (newIndex >= 1 && newIndex <= NoofSteps.length) {
                const step = document.getElementsByClassName("step");
                const No = document.getElementsByClassName("No");
                for (let i = 1; i < newIndex; i++) {
                    step[i].children[0].style.backgroundColor = '#ff2523';
                    step[i].children[1].style.backgroundColor = '#ff2523';
                    No[i].style.color = '#fff';
                }
                for (let i = newIndex; i < NoofSteps.length; i++) {
                    step[i].children[0].style.backgroundColor = 'rgb(219, 219, 219)';
                    step[i].children[1].style.backgroundColor = 'rgb(219, 219, 219)';
                    No[i].style.color = '#000';
                }
            }
            return newIndex;
        });

    }

    const SubmitData = async () => {
        setisLoading(true)
        const Data = await JSON.parse(localStorage.getItem('Data'))
        const update_id = JSON.parse(localStorage.getItem('update_id'))
        const formData = new FormData();
        if (is_from_update) {
            let files = ['logo', 'brochure', 'banner'];
            files.forEach(file => {
                let fileData = FormAuth.fileData[file];
                if (typeof fileData === 'object' && Object.keys(fileData).length > 0) {
                    Object.values(fileData).forEach((fileObj, index) => {
                        formData.append(`${file}[${index}]`, fileObj);
                    });
                } else {
                    formData.append(file, fileData);
                }
            });

            formData.append('Name', Data.BasicData.Name);
            formData.append('college_id', update_id.college_id);
            const response = await fetch(process.env.REACT_APP_URL + '/update_college', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const filedata = await response.json();
                const AuthData = {
                    id: update_id.college_id,
                    clean_string: filedata.clean_string
                }
                const CollegeData = Data
                const ResponceData = {
                    auth_data: AuthData,
                    college_data: CollegeData
                }
                await axios.post(process.env.REACT_APP_URL + '/FB/data', ResponceData).then((res) => {
                    localStorage.removeItem('Data')
                    setisLoading(false)
                    notify('Update Success')
                    setTimeout(()=>{
                        Navigate('/user',{replace:true})
                    },2000)
                }).catch((err) => {
                    console.log(err)
                    setisLoading(false)
                    notify('err')
                })
            }
            else {
                console.error('Error sending data:', response.statusText);
                setisLoading(false)
                notify('err')
            }

        } else {
            formData.append('banner', FormAuth.fileData.banner);
            formData.append('logo', FormAuth.fileData.logo);
            formData.append('brochure', FormAuth.fileData.brochure);
            formData.append('Name', Data.BasicData.Name);
            const response = await fetch(process.env.REACT_APP_URL + '/FB/image', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const filedata = await response.json();
                if (filedata.error === "Data already exist") {
                    return
                }
                Data.BasicData.bannerImage = filedata.data.banner_link;
                Data.BasicData.logoImage = filedata.data.logo_link;
                Data.BasicData.Broucher = filedata.data.brochure_link;
                const AuthData = {
                    id: filedata.data.id,
                    clean_string: filedata.data.clean_string
                }
                const CollegeData = Data
                const ResponceData = {
                    auth_data: AuthData,
                    college_data: CollegeData
                }
                await axios.post(process.env.REACT_APP_URL + '/FB/data', ResponceData).then((res) => {
                    localStorage.removeItem('Data')
                    setisLoading(false)
                    notify('Add Success')
                    setTimeout(()=>{
                        Navigate('/user',{replace:true})
                    },2000)
                }).catch((err) => {
                    setisLoading(false)
                    notify('err')
                })
            }
            else {
                setisLoading(false)
                notify('err')
            }
        }
    }



    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='Form'>
                {
                    (isLoading) &&
                    <Loading />
                }
                <div className='top-steps'>
                    {
                        NoofSteps.map((item, id) => (
                            <div className='step' key={id}>
                                {
                                    (item.id !== 1) && <p></p>
                                }
                                <span className='No'>
                                    {item.id}
                                    <span className='title'>{item.title}</span>
                                </span>
                            </div>
                        ))
                    }
                </div>
                {(currentIndex === 1) && <Page1 BasicData={BasicData} setBasicData={setBasicData} />}
                {(currentIndex === 2) && <Page2 Summary={Summary} setSummary={setSummary} />}
                {(currentIndex === 3) && <Page3 Affilation={Affilation} setAffilation={setAffilation} />}
                {(currentIndex === 4) && <Page4 Courses={Courses} setCourses={setCourses} />}
                {(currentIndex === 5) && <Page5 Procedure={Procedure} setProcedure={setProcedure} />}
                {(currentIndex === 6) && <Page6 PlacementTable={PlacementTable} setPlacementTable={setPlacementTable} />}
                {(currentIndex === 7) && <Page7 ScholarshipTable={ScholarshipTable} setScholarshipTable={setScholarshipTable} />}
                {(currentIndex === 8) && <Page8 FAQ={FAQ} setFAQ={setFAQ} />}
                {(currentIndex === 9) &&
                    <Page9
                        BasicData={BasicData}
                        SummaryData={Summary}
                        AffilationData={Affilation}
                        CoursesData={Courses}
                        AdmissionData={Procedure}
                        ScholarshipTable={ScholarshipTable}
                        PlacementTable={PlacementTable}
                        FAQData={FAQ}
                    />
                }
                <div className='Btn'>
                    <div className='container'>
                        {
                            (isPrevShow) &&
                            <button onClick={() => {
                                NextPage(-1)
                            }}
                                style={{
                                    color: '#000',
                                    backgroundColor: '#dbdbdb'
                                }}
                            >Prev</button>
                        }
                        {
                            (currentIndex === 9) ?
                                <button onClick={SubmitData}>
                                    {
                                        (is_from_update) ? 'Update' : 'Submit'
                                    }
                                </button>
                                :
                                <button onClick={() => {
                                    NextPage(1)
                                }}>Next</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form