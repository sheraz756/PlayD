import React from 'react'

const EndMessage = ({ message }) => {
    return (
        <div style={{
            textAlign: 'center',
            color: '#14ED82',
            fontWeight: 'bold'
        }}>
            <p>{message}</p>
        </div>
    )
}

export default EndMessage