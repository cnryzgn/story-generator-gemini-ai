import './ApiKeyEntrancePage.css'
import confirmAPIKey from '../../helpers/ConfirmAPIKey'
import Toast from '../partials/Toast/Toast'

export default function ApiKeyEntrancePage({ apiKeyInput, setApiKeyInput, setApiKey, setLoading, status, setStatus }) {

    function apiKeyHandler() {
        if (apiKeyInput === null || apiKeyInput.trim() === '') {
            return false
        }

        setLoading({ isLoading: true })
        confirmAPIKey(apiKeyInput)
            .then(res => {
                if (res) {
                    setStatus({
                        success: true,
                        error: false,
                        message: 'Valid Api Key'
                    })
                    setApiKey(apiKeyInput)
                    sessionStorage.setItem('apiKey', apiKeyInput)
                    setLoading({ isLoading: false })
                } else {
                    setStatus({
                        success: false,
                        error: true,
                        message: 'Invalid Api Key'
                    })
                    setLoading({ isLoading: false })
                }
            })
            .catch(err => {
                setStatus({
                    success: false,
                    error: true,
                    message: 'Invalid Api Key'
                })
                setLoading({ isLoading: false })
            })

    }



    return (
        <div className="api-key-entrance__container">
            <div className="api-key-entrance__wrapper">
                <h1>Gemini AI Story Generator</h1>
                <p>Please type your API key. If you don't have one, you can provide it <a href="https://ai.google.dev/" target="_blank">here</a>.</p>

                <div className="api-key-input__wrapper">
                    <input
                        type="text"
                        id='api-key-input'
                        className={status.error === true ? 'invalid-input' : ''}
                        placeholder='Type here your api key'
                        onChange={(e) => setApiKeyInput(e.target.value)}
                    />
                    <button onClick={apiKeyHandler}>Go</button>
                </div>
                {
                    (status.success === true || status.error === true) &&
                    <Toast type={`${status.success === true ? 'valid' : 'invalid'}`} infoText={status.message} setStatus={setStatus} />
                }
            </div>
        </div>
    )
}
