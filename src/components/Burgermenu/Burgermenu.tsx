import './Burgermenu.css'
import { useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { Link } from 'react-router-dom'

const Burgermenu = forwardRef((_, ref) => {
    const [visible, setVisible] = useState(false)

    const isOpen = { display: visible ? '' : 'none'}
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return (
            toggleVisibility
        )
    })
    return (
        <div className='burger-main'>
        <div onClick={toggleVisibility} style={{paddingLeft: '12px'}}>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
            <div className='burger-line'></div>
        </div>
            <div className='burger-content' style={isOpen}>
                <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Login</Link>
                <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Logout</Link>
                <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Profile</Link>
                <Link onClick={toggleVisibility} to={'login'} className='burger-link'>Home</Link>
            </div>
        </div>
    )
})

export default Burgermenu