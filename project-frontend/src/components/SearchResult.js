import React from 'react'
import Video from '../components/Video'

class SearchResult extends React.Component {

    render(){
        return (
            <div>
                {this.props.videos.length > 0 ? this.props.videos.map(video => {
                    return (<Video video={video}/>)
                }): null}
            </div>
        )
    }
}
export default SearchResult