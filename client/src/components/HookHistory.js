import React from 'react'
import { useHistory } from 'react-router-dom'

const HookHistory = () => {

    const history = useHistory()
    //console.log('useHistory', history)

    const handleClick = () => {
        history.push('/greet')
    }
    return (
        <div>
           <button onClick={handleClick}>useHistory</button>
        </div>
    )
}

export default HookHistory;