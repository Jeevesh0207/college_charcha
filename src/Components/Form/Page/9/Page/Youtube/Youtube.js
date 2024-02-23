import React from 'react'
// import './StyleYoutube.css'

function Youtube({ YoutubeLink }) {
    function youtubeLinkToEmbed(link) {
        const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        const match = link.match(regExp);

        if (match && match[2].length === 11) {
            return 'https://www.youtube.com/embed/' + match[2];
        }
    }
    return (
        <div className='Youtube' id='youtubeID'>
            <div className='Youtube_container'>
                <div className='Youtube_Top'>
                    <h1>Youtube Video</h1>
                </div>
                <iframe src={youtubeLinkToEmbed(YoutubeLink)} title="YouTube video player" frameBorder="0"  allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default Youtube