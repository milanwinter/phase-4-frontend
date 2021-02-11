import React from 'react'


const Video = (props) => {
    return (
        <React.Fragment>
            <iframe width="220" height="215" src={`http://www.youtube.com/embed/${props.video.id.videoId}`} 
                frameborder="0" allowfullscreen></iframe>
        </React.Fragment>
    )
}
export default Video