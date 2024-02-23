import React, { useEffect, useState } from 'react';
import './StylePage1.css';
import { useForm } from '../../../../Hook/FormData';

function Page1({ BasicData, setBasicData }) {
    const FormAuth = useForm()
    const [LogoImg, setLogoImg] = useState(null)
    const [BannerImg, setBannerImg] = useState(null)
    const [is_from_update,setis_from_update]=useState(false)
    const OpenUrl = (link) => {
        let newTab = window.open();
        newTab.opener = null;
        newTab.location = link;
        newTab.rel = 'noopener noreferrer';
      }
    

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const imageUrl = URL.createObjectURL(file);
            const imageUrl = file;
            FormAuth.setfileData(prevData => ({
                ...prevData,
                banner: imageUrl
            }))
            setBannerImg(URL.createObjectURL(imageUrl))
            setBasicData(prevData => ({
                ...prevData,
                bannerObj: imageUrl
            }))
        }
    };

    const handleLogoImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const imageUrl = URL.createObjectURL(file);
            const imageUrl = file;
            FormAuth.setfileData(prevData => ({
                ...prevData,
                logo: imageUrl
            }))
            setLogoImg(URL.createObjectURL(imageUrl))
            setBasicData(prevData => ({
                ...prevData,
                logoObj: imageUrl
            }))
        }
    };

    const handleBroucherChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const Broucher = URL.createObjectURL(file);
            const Broucher = file;
            FormAuth.setfileData(prevData => ({
                ...prevData,
                brochure: Broucher
            }))
            setBasicData(prevData => ({
                ...prevData,
                brochureObj: Broucher
            }))

        }
    };

    useEffect(() => {
        if (BasicData.logoImage) setLogoImg(BasicData.logoImage)
        if (BasicData.bannerImage) setBannerImg(BasicData.bannerImage)
    }, [BasicData.logoImage, BasicData.bannerImage])

    useEffect(()=>{
        const update_id=JSON.parse(localStorage.getItem('update_id'))
        if(update_id.is_from_update){
            setis_from_update(true)
        }
    },[])

    return (
        <div className='Page1'>
            <div className='container'>
                <div className='Banner'
                    style={{
                        backgroundImage: `url(${BannerImg})`,
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className='Logo'
                        style={{
                            backgroundImage: `url(${LogoImg})`,
                            backgroundPosition: 'top',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <input type='file' onChange={handleLogoImageChange} />
                        <i className="fa-solid fa-plus"></i>
                        <p>Logo</p>
                    </div>
                    <input type='file' onChange={handleBannerImageChange} />
                    <i className="fa-solid fa-plus"></i>
                    <p>Upload Banner</p>
                </div>
                <div className='row Name'>
                    <p>Name</p>
                    <input value={BasicData.Name} type='text' placeholder='Name' onChange={(e) => {
                        setBasicData(prevData => ({
                            ...prevData,
                            Name: e.target.value
                        }))
                    }} />
                </div>
                <div className='EstdNACC'>
                    <div className='row Estd'>
                        <p>Estd</p>
                        <input value={BasicData.Estd} type='text' placeholder='Year' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Estd: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row NACC'>
                        <p>NAAC Grade</p>
                        <input value={BasicData.NAAC} type='text' placeholder='Grade' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                NAAC: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='EmailPhone'>
                    <div className='row Email'>
                        <p>Email</p>
                        <input value={BasicData.Email} type='email' placeholder='Email' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Email: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row Phone'>
                        <p>Phone</p>
                        <input value={BasicData.Phone} type='text' placeholder='Phone' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Phone: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='WebsiteRating'>
                    <div className='row Website'>
                        <p>Website</p>
                        <input value={BasicData.Website} type='text' placeholder='Link' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Website: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row Rating'>
                        <p>Rating</p>
                        <input value={BasicData.Rating} type='text' placeholder='Between (0 to 5)' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Rating: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='WebsiteRating'>
                    <div className='row Website'>
                        <p>State</p>
                        <input value={BasicData.State} type='text' placeholder='State' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                State: e.target.value
                            }))
                        }} />
                    </div>
                    <div className='row Rating'>
                        <p>Country</p>
                        <input value={BasicData.Country} type='text' placeholder='Country' onChange={(e) => {
                            setBasicData(prevData => ({
                                ...prevData,
                                Country: e.target.value
                            }))
                        }} />
                    </div>
                </div>
                <div className='row Location'>
                    <p>Location Link</p>
                    <input value={BasicData.LocationLink} type='text' placeholder='Location' onChange={(e) => {
                        setBasicData(prevData => ({
                            ...prevData,
                            LocationLink: e.target.value
                        }))
                    }} />
                </div>
                <div className='row Youtube_row'>
                    <p>Youtube Link</p>
                    <input value={BasicData.YoutubeLink} type='text' placeholder='Link' onChange={(e) => {
                        setBasicData(prevData => ({
                            ...prevData,
                            YoutubeLink: e.target.value
                        }))
                    }} />
                </div>
                <div className='row Broucher'>
                    <p>Select your Broucher</p>
                    <input
                        // value={Broucher}
                    type='file'
                    onChange={handleBroucherChange} />
                    {
                        (is_from_update)&&
                        <p onClick={()=>{
                            OpenUrl(BasicData.Broucher)
                        }}> Open your Previous Broucher</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Page1;
