import { useEffect, useRef, useState } from 'react'
import './Toast.css'

export default function Toast({ type, infoText, setStatus }) {
    const [isVisible, setIsVisible] = useState(false)
    const toastRef = useRef()

    useEffect(() => {
        setIsVisible(true)

        const timeoutHandler = setTimeout(() => {
            if (toastRef.current) {
                setStatus({
                    success: false,
                    error: false,
                    message: ''
                })
                setIsVisible(false)
            }
        }, 2400)

        return () => {
            clearTimeout(timeoutHandler)
        }
    }, [])


    return (
        isVisible && (
            <div ref={toastRef} className={`toast__container ${type === 'invalid' ? 'toast__container-invalid' : ''}`}>
                <div className="toast-icon__wrapper">
                    {
                        type === 'valid' &&
                        <i id="valid-icon" className="fa-solid fa-check"></i>
                    }

                    {
                        type === 'invalid' &&
                        <i id="invalid-icon" className="fa-solid fa-xmark"></i>
                    }
                </div>
                {
                    infoText &&
                    <div className="info__wrapper">
                        <h3 className="info-text">{infoText}</h3>
                    </div>
                }
            </div>
        )
    )
}