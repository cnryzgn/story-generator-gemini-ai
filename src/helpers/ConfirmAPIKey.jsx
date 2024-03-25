import axios from 'axios'

export default async function ConfirmAPIKey(apiKey) {

    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            "contents": [{
                "parts": [{
                    "text": 'You need to do anything. I just try to confirm the api key valid or not.'
                }]
            }]
        })

        const data = await response.data

        return true
    } catch (err) {
        return false
    }

}