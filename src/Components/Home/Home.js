import React, { useEffect, useState } from 'react';
import './HomeStyle.css';
import Navbar from '../Navbar/Navbar';
// import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Slider from '../Slider/Slider';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useAuth } from '../../Hook/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home({ setisPageLogin, setisPageSignUp }) {
    const Navigate = useNavigate();
    const Auth = useAuth();
    const [SearchInput, setSearchInput] = useState("")
    const [SearchDataList, setSearchDataList] = useState({})
    const SendDataToPage = (college_data) => {
        console.log(college_data)
        localStorage.setItem('college_id', college_data.id)
        Navigate(`/college/${college_data.clean_string}`);
    }



    function searchFilter(query, data) {
        let result = {};
        for (let key in data) {
            if (key.includes(query)) {
                result[key] = data[key];
            }
        }
        return result;
    }

    useEffect(() => {
        const AllList = JSON.parse(localStorage.getItem("CollegeList"));
        const searchInputWithoutSpaces = SearchInput.replace(/\s/g, ''); // Remove spaces
        const lowercaseSearchInput = searchInputWithoutSpaces.toLowerCase(); // Convert to lowercase
        let filteredData = searchFilter(lowercaseSearchInput, AllList);
        setSearchDataList(filteredData);
    }, [SearchInput]);


    useEffect(() => {
        const GetAllCollegeList = async () => {
            await axios.get(process.env.REACT_APP_URL + '/get_college_list').then((res) => {
                // console.log(res.data)
                localStorage.setItem("CollegeList", JSON.stringify(res.data))
            }).catch((err) => {
                console.log(err)
            })
        }
        GetAllCollegeList()
    }, [])
    return (
        <div className='Home' id='homeID'>
            <Slider />
            <div className='background-blur'>
                <Navbar />
                <div className='LoginSignUp'>
                    {
                        (!Auth.isLogin) &&
                        <div className='LoginSignUp-btn'>
                            <button onClick={() => {
                                setisPageSignUp(false);
                                setisPageLogin(true);
                            }}>LOGIN</button>
                            <button onClick={() => {
                                setisPageLogin(false);
                                setisPageSignUp(true);
                            }}>SIGN UP</button>
                        </div>
                    }
                </div>
                <div className='Search'>
                    <div className='search-container'>
                        <div className='search-banner'>
                            {/* <Player
                                autoplay
                                loop
                                src={require('../../img/search.json')}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    scale: '1.6'
                                }}
                            >
                                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                            </Player> */}
                            {/* <img src={require('../../img/search_banner.jpg')} alt='png' /> */}
                            <LazyLoadImage
                                src={require('../../img/search_banner.jpg')}
                                alt='png'
                                effect="blur"
                                height='100%'
                                // width='100%'
                            />
                        </div>
                        <h2>Welcome to College Charcha!!</h2>
                        <h2>Make your college search easier with us</h2>
                        <div className='search-box'>
                            <div className='search-logo'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='search-inpt'>
                                <input
                                    value={SearchInput}
                                    type='text'
                                    placeholder='Search College and Courses'
                                    onChange={(e) => {
                                        setSearchInput(e.target.value)
                                    }} />
                            </div>
                            <div className='search-btn'>
                                <button>Search</button>
                            </div>
                            {
                                (Object.keys(SearchDataList).length > 0 && SearchInput) &&
                                <div className='search-result'>
                                    {/* <div className='search-item' onClick={() => {
                                    SendDataToPage();
                                }}>
                                    <div className='Left'>
                                        <img src={require('../../img/1.jpeg')} alt='png' />
                                    </div>
                                    <div className='Right'>
                                        <p>IIIT Bhagalpur (IIITBH): Placement, Cutoff, Ranking, Courses, Fees, Admission 2024</p>
                                    </div>
                                </div> */}
                                    {Object.keys(SearchDataList).map((collegeKey, index) => (
                                        <div className='search-item' key={index} onClick={() => SendDataToPage(SearchDataList[collegeKey])}>
                                            <div className='Left'>
                                                {/* <img src={SearchDataList[collegeKey].logo} alt='png' /> */}
                                                <div className='img'>
                                                    <LazyLoadImage
                                                        src={SearchDataList[collegeKey].logo}
                                                        alt='png'
                                                        effect="blur"
                                                        height='100%'
                                                        width='100%'
                                                    />
                                                </div>
                                            </div>
                                            <div className='Right'>
                                                <p>{SearchDataList[collegeKey].org_string}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
