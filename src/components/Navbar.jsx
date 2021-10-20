import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, MenuOutlined, FundOutlined, BulbOutlined } from "@ant-design/icons"
import icon from "../images/eth.png"
import { useEffect, useState } from "react";

const Navbar = () => {

    const [menu, setMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize < 800) {
            setMenu(false);
        } else {
            setMenu(true)
        }
    }, [screenSize]);

    const handleLink = () =>{
        if(screenSize < 800 ){
            setMenu(false)
        }
    }

    return (
        <div className="nav-container">
            <div className="logo-container">
                <div className="lc-title">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo" style={{ textAlign: 'center', marginTop: '0.5em' }}>
                    <Link to="/">Zrypto</Link>
                </Typography.Title>
                </div>
                {screenSize <800 && <Button className="menu_control_container"
                    onClick={() => setMenu((value)=>!value)}>
                    <MenuOutlined />
                </Button>}
            </div>
            {menu && (<Menu theme="dark">
                <Menu.Item icon={<HomeOutlined />} key={1}>
                    <Link to="/" onClick={handleLink}>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} key={2}>
                    <Link to="/cryptocurrencies" onClick={handleLink}>Crypto</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />} key={3}>
                    <Link to="/exchanges" onClick={handleLink}>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />} key={4}>
                    <Link to="/news" onClick={handleLink}>News</Link>
                </Menu.Item>
            </Menu>)}
        </div>
    )
}


export default Navbar
