import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, coinName, currentPrice }) => {

    const coinPrice = [];
    const coinStamp = [];
    for (let index = 0; index < coinHistory?.data?.history?.length; index++) {
       coinPrice.push(coinHistory.data.history[index].price);
       coinStamp.push(new Date(coinHistory.data.history[index].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinStamp,
        datasets : [{
            label : 'Price in USD',
            data : coinPrice,
            fill : false,
            backgroundColor: '#0071bd' ,
            borderColor : '#ecc100'
        }]
    }

    const options = {
        scales : {
            yAxes:[{
                ticks : {
                    beginAtZero:true
                }
            }]
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container" >
                    <Title level={5} className="price-change"> 
                       {coinHistory && ( `Change : ${coinHistory?.data?.change}%`)}
                    </Title>
                    <Title level={5} className="current-price"> 
                        Current {coinName} Price : ${currentPrice}
                    </Title> 
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart
