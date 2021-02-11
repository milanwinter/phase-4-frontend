import React from 'react'

class SearchResult extends React.Component {

    render(){
        return (
            <div>
                {this.props.videos.length > 0 ? this.props.videos.map(video => {
                    return (<iframe width="420" height="315" src={`http://www.youtube.com/embed/${video.id.videoId}`} 
                    frameborder="0" allowfullscreen></iframe>)
                }): null}

            </div>
        )
    }
}
export default SearchResult