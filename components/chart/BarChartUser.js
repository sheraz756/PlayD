import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css'
const BarChartUser = ({ data, dataKey }) => {
    console.log(data, 'data --<');
    return (
        <>
            <div className={styles.chart}>
                <h3 className={styles.chartTitle}>User Stats</h3>
                {data.length > 1 ?
                    <BarChart width={500} height={250} data={data}>
                        <Bar dataKey={dataKey} fill="#088F8F" />
                        <XAxis dataKey="name" stroke='#088F8F' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </BarChart> :
                    <div
                        style={{
                            width: '500px',
                            height: '200px'
                        }}
                    >
                        <h4 style={{
                            padding: '5px'
                        }}>No users found.</h4>
                    </div>
                }
            </div>
        </>
    )
}

export default BarChartUser