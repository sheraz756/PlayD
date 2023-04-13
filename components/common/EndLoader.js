import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const EndLoader = () => {
    return (
        <div style={{
            textAlign: 'center',
            color: '#14ED82',
            fontWeight: 'bold'
        }}>
            <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '20px' }} />
        </div>
    )
}

export default EndLoader