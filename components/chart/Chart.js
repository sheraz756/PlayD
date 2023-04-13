import React from 'react'
import styles from './chart.module.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Chart = ({ title, data, dataKey, grid }) => {
    return (
        <div className={styles.chart}>
            <h3 className={styles.chartTitle}>{title}</h3>
            <ResponsiveContainer aspect={4 / 1} width="100%">
                <LineChart data={data}>
                    <XAxis dataKey='name' stroke='#088F8F' />
                    <Line type="monotone" dataKey={dataKey} stroke="#088F8F" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="1 1" />}
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart