import millify from "millify";
import { Link } from "react-router-dom";
import { Typography , Row , Col , Statistic} from "antd";

const {Title} = Typography;

const Homepage = () => {
    return (
        <>
         <Title level={2} className="heading">Global Crypto Stats</Title><Row>
             <Col span={12}><Statistic title="Total Cryptocurrencies" value="5"></Statistic></Col>
             <Col span={12}><Statistic title="Total Exchanges" value="5"></Statistic></Col>
             <Col span={12}><Statistic title="Total Market Capital" value="5"></Statistic></Col>
             <Col span={12}><Statistic title="Total 24 Hour Volume" value="5"></Statistic></Col>
             <Col span={12}><Statistic title="Total Markets" value="5"></Statistic></Col>
         </Row>   
        </>
    )
}

export default Homepage
