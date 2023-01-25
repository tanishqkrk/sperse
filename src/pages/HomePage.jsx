import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import '../styles/ComponentStyles.css'

const HomePage = () => {
    return (
        <div className="homePage">
            <div className="container">
                <Sidebar />
                <ChatSection />
            </div>
        </div>
    )
}

export default HomePage