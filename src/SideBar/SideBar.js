import React from 'react'
import './SideBar.css'

function SideBar(markers) {
    console.log("these are the markers in sidebar", markers)

const onItemClick = () => {

}

    return (
        <div className="sidebar">
            <ul>
                <li>
                    This is marker one with it's stuff.
                </li>
                <li>
                    This is marker two with it's stuff.
                </li>
                <li>
                    This is marker three with it's stuff.
                </li>
            </ul>
        </div>
    )
}

export default SideBar
