import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";

import { useGetCryptoDetailsQuery } from "../services/cryptoapi";
import { useState } from "react";
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;



const CryptoDetails = () => {

    const [timePeriod, setTimePeriod] = useState("7d");
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;
    console.log(cryptoDetails);

    const time = ['3 H', '24 H', '7 D', '30 D', '1 Y', '3 M', '3 Y', '5 Y'];
 
    const stats = [
       { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
       { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
       { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
       { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
       { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
   ];

   /*
   const genericStats = [
       { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
       { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
       { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
       { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
       { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
   ];  */

    return (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name">
                        {cryptoDetails?.name}({cryptoDetails?.slug}) Price
                    </Title>
                    <p>
                        {cryptoDetails?.name} live price in dollars.
                        View value statistics , market cap and supply.
                    </p>
                </Col>
                <Select
                    defaultValue="7D"
                    className="select-timeperiod"
                    placeholder="Select Time-Period"
                    onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => (
                        <Option key={date}>{date}</Option>
                    ))}
                </Select>
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-title">
                            <Title level={3} className="coin-detailes-heading">{cryptoDetails?.name} Value Statistics</Title>
                            <p>An overview showing statistics of {cryptoDetails?.name} </p>
                        </Col>
                    </Col>
                </Col>
            </Col>
    )
}

export default CryptoDetails
