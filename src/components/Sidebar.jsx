import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { useEffect, useRef } from 'react'

const Sidebar = ({ setCallbackForSiderbarRef }) => {
    const sidebar = useRef();
    useEffect(() => {
        setCallbackForSiderbarRef(sidebar)
    })
    return (
        <div ref={sidebar} className="sidebar">
            <Navbar />
            <Search />
            <Chats sidebar={sidebar} />
        </div>
    )
}

export default Sidebar