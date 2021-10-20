import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from "../services/cryptoapi";
import { Cryptocurrencies,News} from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader/>

    return (
        <>
            <Title level={2} className="heading">Global Crypto Statistics</Title><Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}></Statistic></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={globalStats.totalExchanges}></Statistic></Col>
                <Col span={12}><Statistic title="Total Market Capital" value={millify(globalStats.totalMarketCap)}></Statistic></Col>
                <Col span={12}><Statistic title="Total 24 Hour Volume" value={millify(globalStats.total24hVolume)}></Statistic></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}></Statistic></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title" style={{paddingRight:"2rem"}}>Top 10 Cryptocurrencies in the world</Title>
                <Title level={4} className="show-more" style={{textAlign:"right"}}>
                    <Link to="/cryptocurrencies">
                        Show More
                    </Link>
                </Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className="home-heading-container">
                <Title level={2} className="home-title" style={{paddingRight:"2rem"}}>Latest Crypto News</Title>
                <Title level={4} className="show-more" style={{textAlign:"right"}}>
                    <Link to="/news">
                        Show More
                    </Link>
                </Title>
            </div>
            <News simplified/>
        </>
    )
}

export default Homepage
