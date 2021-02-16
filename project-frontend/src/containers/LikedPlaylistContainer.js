import React ,{Component,Redirect} from 'react'
import {Route} from 'react-router-dom'
import Playlist from '../components/Playlist'
import { withRouter } from 'react-router';

class LikedPlaylistContainer extends Component {


    componentDidMount() {
        let token = localStorage.getItem("token")
        fetch('http://localhost:3000/likes',{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }


    render() {


        return (
            <p> Made it Into the Liked Playist</p>
        )
    }




}

export default LikedPlaylistContainer

