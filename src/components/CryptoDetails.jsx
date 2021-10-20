import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoapi";
import { useState } from "react";
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;



const CryptoDetails = () => {

    const [timePeriod, setTimePeriod] = useState("7d");
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const cryptoDetails = data?.data?.coin;

    if (isFetching) return <Loader/>

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price ? millify(cryptoDetails.price) : 0}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume ? millify(cryptoDetails.volume) : 0}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap ? millify(cryptoDetails.marketCap) : 0}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails ? millify(cryptoDetails?.allTimeHigh.price) : 0}`, icon: <TrophyOutlined /> },
    ];


    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails ? millify(cryptoDetails.totalSupply) : 0}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails ? millify(cryptoDetails.circulatingSupply) : 0}`, icon: <ExclamationCircleOutlined /> },
    ];


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
                onChange={(value) => setTimePeriod(value)}
                style={{textTransform:'uppercase'}}>
                {time?.map((date) => (
                    <Option key={date} style={{textTransform:'uppercase'}}>{date}</Option>
                ))}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails ? millify(cryptoDetails?.price) : 0} coinName={cryptoDetails ? cryptoDetails?.name : ""} />
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-title">
                        <Title level={3} className="coin-detailes-heading">{cryptoDetails?.name} Value Statistics</Title>
                        <p>An overview showing statistics of {cryptoDetails?.name} </p>
                    </Col>
                    {stats?.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-title">
                        <Title level={3} className="coin-detailes-heading">Other Statistics</Title>
                        <p>An overview showing statistics of {cryptoDetails?.name} </p>
                    </Col>
                    {genericStats?.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        What is {cryptoDetails ? cryptoDetails?.name : ""}
                        {HTMLReactParser(cryptoDetails ? cryptoDetails.description : "")}
                    </Title>
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails ? cryptoDetails?.name : ""} Links
                    </Title>
                    {cryptoDetails ? (cryptoDetails.links.map((link) => (
                        <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))) : 0}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails
