import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Dashboard from "../components/Dashboard/Dashboard"
import HolderReward from "../pages/HolderReward/HolderReward"
import ReferraReward from "../pages/ReferralReward/ReferraReward"
import Revshare from "../components/RevshareDashboard/Revshare"


const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="revshare-dashboard" element={<Revshare/>} />
                <Route path="holder-reward" element={<HolderReward />} />
                <Route path="referral-reward" element={<ReferraReward />} />
            </Route>

        </Routes>
    )
}

export default MainRoutes