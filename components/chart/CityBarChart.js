import React from 'react'
import styles from './chart.module.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CityBarChart = ({ title, data,
    dataKey }) => {
    return (
        <div className={styles.chart}>
            <h3 className={styles.chartTitle}>{title}</h3>
            <ResponsiveContainer aspect={4 / 1} width="100%">
                <BarChart data={data}>
                    <Bar dataKey={dataKey} fill="#088F8F" />
                    <XAxis dataKey="_id" stroke='#088F8F' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CityBarChart