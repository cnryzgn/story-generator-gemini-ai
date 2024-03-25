import { useEffect, useRef } from 'react'
import './StoryOutput.css'

export default function StoryOutput({ story }) {
    const storyTitleRef = useRef()
    const storyRef = useRef()

    function copyButtonHandler() {
        const storyTitle = storyTitleRef.current.innerText
        const storyText = storyRef.current.innerText
        const story = `${storyTitle}
${storyText}`


        navigator.clipboard.writeText(story)

        // Tooptip 
        document.querySelector('.open-copy-button-tooltip').style.display = 'block'

        setTimeout(() => {
            document.querySelector('.open-copy-button-tooltip').style.display = 'none'
        }, 1800)
    }

    useEffect(() => {
        if (story.title !== null && story.content !== null) {
            setTimeout(() => {
                document.querySelector('.story-output__container').scrollIntoView({ behavior: 'smooth' })
            }, 350)
        }
    }, [story])

    return (
        <div
            className='story-output__container'
            style={{ display: story.title === null && story.content === null ? 'none' : 'flex' }}
        >
            {
                story.title !== null &&
                <h1 id='title' ref={storyTitleRef}>{story.title}</h1>
            }
            {
                story.content !== null &&
                <p ref={storyRef}>{story.content}</p>
            }
            <div className='top-side'>
                <button id='copy-button' onClick={copyButtonHandler}><i className="fa-regular fa-copy" ></i></button>
                <span className='open-copy-button-tooltip'>
                    Copied
                    <i style={{ marginLeft: '5px' }} className="fa-solid fa-check"></i>
                </span>
            </div>
        </div>
    )
}