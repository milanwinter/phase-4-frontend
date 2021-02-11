import React from 'react'
import Video from '../components/Video'
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = `https://www.googleapis.com/youtube/v3/search?`
const key = `key=AIzaSyC4qGwOYnsvojMZx54JxEee0O7l1Is_n1g`
const maxResults = `&type=video&part=snippet&maxResults=10&q=`

class SearchResult extends React.Component {
    //query for user input, videos for list of results from search
    state = {
        query: '',
        videos: []
      }
    
      //event handlers
      handleSubmit = event => {
        event.preventDefault()
        console.log(`searching youtube for: ${this.state.query} `)
        fetch(`${endpoint}${key}${maxResults}${this.state.query}`)
        .then(res => res.json())
        .then(videos => this.setState({
          videos: videos.items
        }))
      }
    
      handleChange = (e) => {
        let query =  e.target.value
        this.setState({query})
      }

    render(){
        return (
             <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search YouTube" className="rounded-pill" onChange={this.handleChange}></input>
                    <input type="submit" className="btn btn-danger rounded-sm"></input>
                </form>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.videos.length > 0 ? this.state.videos.map(video => {
                            return (<Video video={video}/>)
                        }): null}
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult