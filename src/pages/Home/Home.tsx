import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { useState } from 'react';
import { IoHome, IoPeopleSharp, IoGift } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiLinkM } from "react-icons/ri";
import { BsQuestionCircleFill } from "react-icons/bs";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HiCash } from "react-icons/hi";
import { FaPodcast } from "react-icons/fa";

// local import 
import "./home.css";
import broLogo from "../../assets/broLogo.gif"
import broEllipse from "../../assets/broEllipse.png"
import socialLinks from "../../socialLinks.json"


const { Header, Sider, Content } = Layout;

const Home = () => {
    const path = useLocation()
    const [isPath, setIsPath] = useState(path.pathname)
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobile,setMobile]= useState(false);
    console.log("mobile : ",mobile);
    
    const handleNavigate: MenuProps['onClick'] = (e) => {
        setIsPath(e.key)
        switch (e.key) {
            case '/':
                navigate("/")
                break;
            case '/revshare-dashboard' :
                navigate("/revshare-dashboard")
                break;
            case '/holder-reward':
                navigate("/holder-reward")
                break;
            case '/referral-reward':
                navigate("/referral-reward")
                break;
            case "/itsurbro" :
                window.open("https://t.me/bro_bot_token", '_blank');
            break;
            default:
                break;
        }
    }
    return (
        <Layout className={`mainHomeContent ${collapsed ? "removegap" : ""}`}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log("broken :",broken);
                    if (broken) {
                        setCollapsed(true)
                        setMobile(true)
                    }
                    else {
                        setCollapsed(false)
                        setMobile(false)
                    }
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                className={`BroSider ${collapsed ? "collapsed" : ""}`}
                width={250}
            >
                <div className='BroSiderContent'>
                    <div>
                        <div className="demo-logo-vertical">
                            <img src={broLogo} alt="broLogo" className='broLogoGif' />
                            <p>BRO BOT</p>
                            <img src={broEllipse} alt="broEllipse" />
                        </div>
                        <Menu
                            onClick={handleNavigate}
                            mode="inline"
                            defaultSelectedKeys={['/']}
                            selectedKeys={[isPath]}
                            className='broMenu'
                            items={[
                                {
                                    key: '/',
                                    icon: <IoHome />,
                                    label: 'Dashboard',
                                },
                                {
                                    key: '/revshare-dashboard',
                                    icon: <HiCash />,
                                    label: 'Revshare Dashboard',
                                },
                                {
                                    key: '/holder-reward',
                                    icon: <IoGift />,
                                    label: 'Holder Rewards',
                                },
                                {
                                    key: '/referral-reward',
                                    icon: <IoPeopleSharp />,
                                    label: 'Referral Rewards',
                                },
                                {
                                    key: '/itsurbro',
                                    icon: <FaPodcast />,
                                    label: 'Signal Bot',
                                },
                            ]}
                        />
                        {mobile && <div className='walletConnectButtonNav'>
                        {/* <button>CONNECT WALLET</button> */}
                        <ConnectButton
                            chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
                            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                            showBalance={{ smallScreen: false, largeScreen: true }}
                        />
                        </div>}
                    </div>
                    <div className='sideFooter'>
                        <div className='helpSection'>
                            <div className='questionMark'><BsQuestionCircleFill /></div>
                            <div className='needHelp'>
                                <p>Need help?</p>
                                <p>Please check our docs</p>
                            </div>
                            <button className='documentation'>DOCUMENTATION</button>
                        </div>
                        <div className='socialLinks'>
                            <p>Follow us on :</p>
                            <div className='socialIcons'>
                                <Link to={socialLinks.telegram} target="_blank" rel="noopener noreferrer" ><FaTelegramPlane /></Link>
                                <Link to={socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaXTwitter /></Link>
                                <Link to={socialLinks.website} target="_blank" rel="noopener noreferrer"><RiLinkM /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Sider>

            <Layout className='broMainLayout'>
                <Header className='broHeader'>
                        {mobile && <div className="demo-logo-horizontal">
                            <img src={broLogo} alt="broLogo" className='broLogoGif' />
                            <p>BRO BOT</p>
                        </div>}
                    <Button
                        className='broMenuCollapseButton'
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    {!mobile && <div className='walletConnectButton'>
                        {/* <button>CONNECT WALLET</button> */}
                        <ConnectButton
                            chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
                            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                            showBalance={{ smallScreen: false, largeScreen: true }}
                        />
                    </div>}
                </Header>
                <Content
                    style={{
                        minHeight: 280,
                    }}
                    className='BroMainContent'
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home