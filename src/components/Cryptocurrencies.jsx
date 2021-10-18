import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from "../services/cryptoapi"
import { useEffect, useState } from "react"

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [search,setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()));
        setCryptos(filteredData);
    }, [search,cryptosList])

    if (isFetching) return 'Loading...';

    return (
        <>
            {!simplified && (<div className="search-crypto">
                <Input placeholder="Search Coins" onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>)}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} key={currency.id} className="crypto-card">
                        <Link to={`crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}.${currency?.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl}
                                />} hoverable
                            >
                                <p>Price : {millify(currency.price)}$</p>
                                <p>Market Capital : {millify(currency.marketCap)}</p>
                                <p>Daily Change : {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies