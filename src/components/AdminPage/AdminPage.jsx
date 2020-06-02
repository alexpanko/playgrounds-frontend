import React, { Component } from 'react'
import axios from 'axios'
export default class AdminPage extends Component {
    state={
        playgrounds:[]
    }

    componentDidMount(){
        axios('http://localhost:4000/playground/admin')
        .then(res => res.json())
        .then(result => {
            this.setState({playgrounds:result.PG})
        })
    }

    render() {
        return (
            <div>

{/*
                <ul>
                 {this.state.playgrounds.map(pg => 
                    
                    //<Playground/>
                    //address = pg.address
                    
                )}
                </ul>
                */}
            </div>
        )
    }
}
