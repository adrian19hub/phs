import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { colors } from '../../../styles/defaultTheme';

const fakeApiCall = () => {
    const randomResponseTime = Math.floor(Math.random() * 1000);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, randomResponseTime);
    });
};

const MonitoringGraph = () => {
    const [data, setData] = useState<
        {
            time: string;
            responseTime: number;
        }[]
    >([]);

    const fetchData = async () => {
        const start = Date.now();
        // await axios.get('http://localhost:3000/');
        const r = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        // await fakeApiCall();
        const responseTime = Date.now() - start;
        console.log(responseTime);

        setData((prevData) => [...prevData, { time: moment().format('HH:mm:ss'), responseTime }]);
    };

    useEffect(() => {
        const intervalId = setInterval(fetchData, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const discrepancies = data.filter((d) => d.responseTime > 85);

    return (
        <div>
            <LineChart width={300} height={300} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Line type="linear" dataKey="responseTime" stroke={colors.blue} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <div>
                <h5>Discrepancies</h5>
                <span>total: {discrepancies.length}</span>
                <span> out of: {data.length}</span>
                <div
                    style={{
                        maxHeight: '200px',
                        overflow: 'auto',
                    }}
                >
                    {discrepancies.map((d) => (
                        <p>
                            {d.time} - {d.responseTime}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MonitoringGraph;
