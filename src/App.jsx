import { useEffect, useState } from 'react'
import axios from 'axios'
import StoryForm from './components/StoryForm/StoryForm'
import StoryOutput from './components/StoryOutput/StoryOutput'
import LoadingIcon from './components/partials/Loading/LoadingIcon'
import ApiKeyEntrancePage from './components/ApiKeyEntrancePage/ApiKeyEntrancePage'
import storySplitter from './helpers/StorySplitter'

function App() {
  const [loading, setLoading] = useState({ isLoading: false, text: null, opacity: 0 })
  const [apiKey, setApiKey] = useState(null)
  const [apiKeyInput, setApiKeyInput] = useState(null)
  const [status, setStatus] = useState({
    success: false,
    error: false,
    message: ''
  })
  const [storyPrompt, setStoryPrompt] = useState(null)
  const [story, setStory] = useState({
    title: null,
    content: null,
  })

  useEffect(() => {
    const apiKeySessionStorage = sessionStorage.getItem('apiKey')

    if (apiKeySessionStorage) {
      setLoading({ isLoading: true, text: 'Checking your api key...', opacity: 1 })
      setApiKey(apiKeySessionStorage)
      setLoading({ isLoading: false, text: null, opacity: 1 })
    }
  }, [])

  useEffect(() => {
    if (storyPrompt !== null && storyPrompt !== '') {
      setLoading({ isLoading: true })

      generateAIStory(storyPrompt, apiKey).then(generatedStory => {
        const { title, content } = storySplitter(generatedStory)

        setStory({ title: title, content: content })
        setLoading({ isLoading: false })

      })
    }
  }, [storyPrompt])

  async function generateAIStory(prompt, apiKey) {
    const body = {
      "contents": [{
        "parts": [{
          "text": prompt
        }]
      }]
    }

    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, body)
      const data = await response.data

      return data.candidates[0].content.parts[0].text
    } catch (err) {
      if (err.response.status === 400) {
        return 'Invalid API Key'
      }
    }
  }

  return (
    <>
      {
        loading.isLoading === true && <LoadingIcon text={loading.text} opacity={loading.opacity} />
      }
      {
        apiKey === null
          ? <ApiKeyEntrancePage
            apiKeyInput={apiKeyInput}
            setApiKeyInput={setApiKeyInput}
            setApiKey={setApiKey}
            setLoading={setLoading}
            status={status} setStatus={setStatus}
          />
          : <>
            <StoryForm setStoryPrompt={setStoryPrompt} loading={loading} />
            <StoryOutput story={story} />
          </>
      }
    </>
  )
}

export default App
