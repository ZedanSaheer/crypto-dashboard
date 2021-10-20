import { Row, Col, Collapse, Avatar, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";

import { useGetExchangesQuery } from "../services/cryptoapi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {

    const { data, isFetching } = useGetExchangesQuery();
    const exchangeList = data?.data?.exchanges;

    if (isFetching) return <Loader/>;

    return (
        <>
            <Row style={{marginBottom:"1rem"}}>
                <Col span={6}><b>Exchanges</b></Col>
                <Col span={6}><b>24h Trade Volume</b></Col>
                <Col span={6}><b>Markets</b></Col>
                <Col span={6}><b>Change</b></Col>
            </Row>
            <Row className="exchanges-row">
                {exchangeList?.map((exchange)=>(
                    <Col span={24}>
                        <Collapse>
                            <Panel key={exchange.id}
                            showArrow={false}
                            header={(
                                <Row key={exchange.id}>
                                    <Col span={6} style={{display:"flex",flexDirection:"column"}}>
                                        <Text>
                                            <strong>
                                                {exchange.rank}.
                                            </strong>
                                        </Text>
                                        <Avatar className="exchange-image" src={exchange.iconUrl}>
                                        </Avatar>
                                        <Text>
                                            <strong>
                                                {exchange.name}.
                                            </strong>
                                        </Text>
                                    </Col>
                                    <Col span={6}>$ {millify(exchange.volume)}</Col>
                                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                </Row>
                            )}>
                                {HTMLReactParser(exchange.description||'')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
