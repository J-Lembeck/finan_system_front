import { useEffect, useState } from 'react';
import { Card } from 'antd'
import "./style.sass"
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';
import api from '../../services/api';
import { DashboardProps } from './IDashboard';
import moment from 'moment';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

function Dashboard() {

    const [dashboard, setDashboard] = useState<DashboardProps>();
    const [data, setData] = useState<any>();

    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            }
        }
    }

    useEffect(() => {
        const today = new Date();
        let momentDate = moment(today);
        momentDate = momentDate.subtract(1, 'months');
        const formattedDate = momentDate.format('DD-MM-YYYY');
        const year = momentDate.year();

        api.get("/accounting_record/findDashboard", {
            params: {
                userId: 1,
                paymentDate: formattedDate
            }
        }).then((response) => {
            if(response.status = 200){
                const dashboardData = response.data
                setDashboard(dashboardData);
            }
        })

        api.get("/accounting_record/findChartValues", {
            params: {
                userId: 1,
                year: year
            }
        }).then((response) => {
            if(response.status = 200){
                const labels = response.data.map((value: any) => {
                    return value.label
                })
                const values = response.data.map((value: any) => {
                    return value.value
                })

                const dataValidated = {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: 'transparent',
                        borderColor: "#1677ff",
                        pointBorderColor: "transparent",
                        tension: 0.1
                    }]
                }
                console.log(dataValidated);

                setData(dataValidated);
            }
        })
    }, [])

    return (
        <main id="main">
			<div className='main-container'>
                <div className="cards-container">
                    <Card style={{width: "31%"}}>
                        <p>Entradas do último mês</p>
                        <h1>R$ {dashboard?.receivedValue}</h1>
                    </Card>
                    <Card style={{width: "31%"}}>
                        <p>Saídas do último mês</p>
                        <h1>R$ {dashboard?.paidValue}</h1>
                    </Card>
                    <Card style={{width: "31%"}}>
                        <p>Balanço final</p>
                        <h1>R$ {dashboard?.finalBalance}</h1>
                    </Card>
                </div>
                <div style={{height: "100%", marginTop: "2rem"}}>
                    <Card style={{width: "100%"}}>
                        <h2>Evolução do Faturamento</h2>
                        <div className="main-chart">
                            {data && 
                                <Line data={data} options={options}></Line>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;