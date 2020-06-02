import React from 'react'
import { Link } from 'react-router-dom'

export default function MainMap() {
    return (
        <div>
            MAP

            <Link to='/addPG'> Add new playground</Link>

            <Link to='/admin'> Check new playgrounds</Link>
        </div>
    )
}
