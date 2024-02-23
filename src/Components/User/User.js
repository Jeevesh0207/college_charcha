import React, { useEffect, useState, useRef } from 'react';
import "./StyleUser.css";
import Navbar from '../Navbar/Navbar';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hook/Auth';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../Loading/Loading';

function User() {
    const Auth = useAuth()
    const Navigate = useNavigate()
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
    const [SearchInput, setSearchInput] = useState("")
    const [SearchDataList, setSearchDataList] = useState({})
    const buttonUpdateRef = useRef(null);
    const containerUpdateRef = useRef(null);
    const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
    const buttonDeleteRef = useRef(null);
    const containerDeleteRef = useRef(null);
    const [isLoading, setisLoading] = useState(false)

    const [collegeToDelete, setCollegeToDelete] = useState(null); // Track college to delete

    const LogOut = () => {
        localStorage.removeItem("Token")
        Auth.setisLogin(false)
        Navigate('/', { replace: true })
    }

    const SendToFormAdd = () => {
        const update_id = {
            college_id: null,
            is_from_update: false
        }
        localStorage.setItem('update_id', JSON.stringify(update_id))
        Navigate(`/form/add_data`)
    }

    const notify = (type) => {
        switch (type) {
            case 'Success':
                toast.success("College Deleted Successfully", {
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

    const SendToFormUpdate = (college_data) => {
        const update_id = {
            college_id: college_data.id,
            is_from_update: true
        }
        localStorage.setItem('update_id', JSON.stringify(update_id))
        Navigate(`/form/update_data/${college_data.id}`)
    }

    const DeleteCollege = (college_data) => {
        setCollegeToDelete(college_data); // Set the college to delete
    }

    const confirmDelete = () => {
        setisLoading(true)
        const storage = getStorage();
        const ID = collegeToDelete.id;
        const filesToDelete = ['logo', 'banner', 'brochure'];

        const deletePromises = filesToDelete.map((file) => {
            const desertRef = ref(storage, `${ID}/${file}`);
            return deleteObject(desertRef);
        });

        Promise.all(deletePromises)
            .then(async () => {
                // console.log('All files deleted');
                await axios.post(process.env.REACT_APP_URL + '/delete_college', { id: ID }).then((res) => {
                    // console.log(res.data)
                    setisLoading(false)
                    notify("Success")
                }).catch((err) => {
                    // console.log(err)
                    setisLoading(false)
                    notify("err")
                })
            })
            .catch((error) => {
                notify("err")
                setisLoading(false)
                // console.log(`ERROR: ${error}`);
            });

        setCollegeToDelete(null);
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
        const Token = localStorage.getItem("Token")
        if (!Token) {
            Navigate('/', { replace: true })
        }
    }, [Navigate, Auth])

    useEffect(() => {
        function handleClickOutside(event) {
            if ((buttonUpdateRef.current && !buttonUpdateRef.current.contains(event.target) && containerUpdateRef.current && !containerUpdateRef.current.contains(event.target)) ||
                (buttonDeleteRef.current && !buttonDeleteRef.current.contains(event.target) && containerDeleteRef.current && !containerDeleteRef.current.contains(event.target))) {
                setIsUpdateButtonClicked(false);
                setIsDeleteButtonClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [buttonUpdateRef, containerUpdateRef, buttonDeleteRef, containerDeleteRef]);

    useEffect(() => {
        const GetAllCollegeList = async () => {
            await axios.get(process.env.REACT_APP_URL + '/get_college_list').then((res) => {
                localStorage.setItem("CollegeList", JSON.stringify(res.data))
            }).catch((err) => {
                console.log(err)
            })
        }
        GetAllCollegeList()
    }, [])

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='User'>
                {
                    (isLoading) &&
                    <Loading />
                }
                <div className='UserName'>
                    <img src={require('../../img/user.png')} alt='png' />
                    <h1>{Auth.UserName}</h1>
                    <button onClick={LogOut}>Logout</button>
                </div>
                {
                    (Auth.isAdmin) &&
                    <div className='container'>
                        <div className='btn'>
                            <button onClick={SendToFormAdd}>Add College Details</button>

                            <button ref={buttonUpdateRef} onClick={() => {
                                setIsUpdateButtonClicked(!isUpdateButtonClicked);
                                setIsDeleteButtonClicked(false);
                            }}>Update College Details</button>
                            <button ref={buttonDeleteRef} onClick={() => {
                                setIsDeleteButtonClicked(!isDeleteButtonClicked);
                                setIsUpdateButtonClicked(false);
                            }}>Delete College</button>
                        </div>
                    </div>
                }
                {(isUpdateButtonClicked || isDeleteButtonClicked) && (
                    <div className='search_container' ref={isUpdateButtonClicked ? containerUpdateRef : containerDeleteRef}>
                        <div className='search-box'>
                            <div className='search-logo'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='search-inpt'>
                                <input
                                    value={SearchInput}
                                    type='text' placeholder='Search College '
                                    onChange={(e) => {
                                        setSearchInput(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='search-btn'>
                                <button>Search</button>
                            </div>
                            {
                                (Object.keys(SearchDataList).length > 0 && SearchInput) &&
                                <div className='search-result'>
                                    {Object.keys(SearchDataList).map((collegeKey, index) => (
                                        <div className='search-item' key={index} onClick={() => {
                                            if (isUpdateButtonClicked) {
                                                SendToFormUpdate(SearchDataList[collegeKey])
                                            } else {
                                                DeleteCollege(SearchDataList[collegeKey])
                                            }
                                        }
                                        }>
                                            <div className='Left'>
                                                {/* <img src={SearchDataList[collegeKey].logo} alt={require('../../img/search_banner.png')} /> */}
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
                )}
                {collegeToDelete && (
                    <div className="delete-popup">
                        <p>Are you sure you want to delete {collegeToDelete.org_string}?</p>
                        <div className='btn'>
                            <button onClick={confirmDelete}>Yes</button>
                            <button onClick={() => setCollegeToDelete(null)}>No</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default User;
