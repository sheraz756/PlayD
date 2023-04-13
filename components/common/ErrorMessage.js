import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ errorMsg }) => {
    return (
        <div className='errorMessage'>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }} />
            {errorMsg}
        </div>
    )
}

export default ErrorMessage