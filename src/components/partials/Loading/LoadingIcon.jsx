import './LoadingIcon.css'

export default function LoadingIcon({ text = null, opacity = null }) {


    return (
        <div className="loading__background" style={{ opacity: opacity !== null ? opacity : 0.7 }}>
            <div className="loading-icon"></div>
            {
                text !== null &&
                <h1 id='info-text'>{text}</h1>
            }
        </div>
    )
}