import './StoryForm.css'
import { useEffect, useRef, useState } from 'react'
import languages from '../../Data/Static/Languages'
import categories from '../../Data/Static/Categories'
import Option from '../partials/Option'

export default function StoryForm({ setStoryPrompt, loading }) {
    const [error, setError] = useState({
        details: { status: false, errorText: null },
        category: { status: false, errorText: null },
    })
    const generateButtonRef = useRef()
    const [storyInputs, setStoryInputs] = useState({
        details: null,
        category: null,
        lang: 'english'
    })

    useEffect(() => {
        if (loading.isLoading === true) {
            generateButtonRef.current.disabled = true
        } else {
            generateButtonRef.current.disabled = false
        }
    }, [loading])

    function promptHandler() {
        if (storyInputs.details === null || storyInputs.category === null) {
            const updatedError = {}

            if (storyInputs.details === null) {
                updatedError.details = { status: true, errorText: 'You must fill the description area.' }
            } else {
                updatedError.details = { status: false, errorText: null }
            }

            if (storyInputs.category === null) {
                updatedError.category = { status: true, errorText: 'You must pick a category.' }
            } else {
                updatedError.category = { status: false, errorText: null }
            }

            setError(updatedError)
            return false
        } else {
            setError({
                details: { status: false, errorText: null },
                category: { status: false, errorText: null },
            })
        }
        const prompt = `Create a story with a title, here is details: ${storyInputs.details}, category is : ${storyInputs.category}, in ${storyInputs.lang} language`

        setStoryPrompt(prompt)
    }


    return (
        <div className="story-form__wrapper" >
            <h1>
                <svg viewBox="0 0 1255.00 1255.00" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" transform="matrix(1, 0, 0, 1, 0, 0)" strokeWidth="0.01255"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#111" strokeWidth="2.5100000000000002"></g><g id="SVGRepo_iconCarrier"><path d="M1063.443927 1024z" fill="#D8D8D8"></path><path d="M640.505087 0a414.805401 414.805401 0 0 1 414.805401 414.805401v22.77363q-17.080222 308.257347-17.080223 372.511517a325.337569 325.337569 0 0 0 73.200953 197.642574A612.447975 612.447975 0 0 0 895.081735 920.705322c-81.334392 0-143.148531 93.534551-178.12232 87.0278-81.334392-14.640191-124.44162-87.0278-148.028594-87.0278a154.535346 154.535346 0 0 0-127.694996 87.841143 139.895155 139.895155 0 0 0-121.188244-64.25417A251.323272 251.323272 0 0 0 163.072203 1008.546465a919.078634 919.078634 0 0 0 67.507546-297.683876 904.438443 904.438443 0 0 0-29.280381-226.922954v-43.920572A439.205719 439.205719 0 0 1 640.505087 0z" fill="#deb887"></path><path d="M1037.416921 686.462272c94.347895-11.386815 92.721207 125.254964 168.362193 108.174742 52.054011-18.70691 65.880858-147.21525 24.400317-209.029389a244.003177 244.003177 0 0 0-175.682287-116.308181c-54.494043-8.946783-39.853852 219.602859-17.080223 217.162828zM213.499527 686.462272c-91.094519-11.386815-89.467832 122.814932-162.668785 107.361398-54.494043-18.70691-68.32089-147.21525-26.027006-209.029389a244.003177 244.003177 0 0 1 175.682288-116.308181c54.494043-8.133439 39.853852 220.416203 13.013503 217.976172z" fill="#deb887"></path><path d="M457.502704 321.27085m-101.667991 0a101.66799 101.66799 0 1 0 203.335981 0 101.66799 101.66799 0 1 0-203.335981 0Z" fill="#fff"></path><path d="M782.840273 321.27085m-101.66799 0a101.66799 101.66799 0 1 0 203.335981 0 101.66799 101.66799 0 1 0-203.335981 0Z" fill="#fff"></path></g></svg>
                Gemini AI Story Generator
            </h1>
            <div className="story-form__container">
                <div className="input__wrapper">
                    <label htmlFor="story-details"><span>1</span> Write some prompts about your story.</label>
                    <textarea
                        name="story-details" id="story-details"
                        onChange={(e) => setStoryInputs({ ...storyInputs, details: e.target.value })}
                        className={error.details.status === true ? 'error' : ''}
                        placeholder='Type your story details (e.g., Two people are walking in the forest. A clicking sound is heard behind the trees...)'
                    ></textarea>
                    {
                        error.details.status === true &&
                        <span className="error-info">{error.details.errorText}</span>
                    }
                </div>
                <div className="multiple-input__wrapper">
                    <div className="input__wrapper">
                        <label htmlFor="story-genre"><span>2</span>Choose a genre</label>
                        <select
                            onChange={(e) => setStoryInputs({ ...storyInputs, category: e.target.value })}
                            defaultValue="Select a category"
                            className={error.category.status === true ? 'error' : ''}
                            name="story-genre" id="story-genre"
                        >
                            <option disabled hidden >Select a category</option>
                            {
                                categories &&
                                categories.map((category, i) => (
                                    <Option key={i} option={category} />
                                ))

                            }
                        </select>
                        {
                            error.category.status === true &&
                            <span className="error-info">{error.category.errorText}</span>
                        }
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="story-language"><span>3</span> Choose language</label>
                        <select
                            name="story-language" id="story-language"
                            onChange={(e) => setStoryInputs({ ...storyInputs, lang: e.target.value })}
                        >
                            {
                                languages &&
                                languages.map((lang, i) => (
                                    <Option key={i} option={lang} />
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
            <button
                ref={generateButtonRef}
                id='generate-button'
                className={loading ? 'generate-button-diabled' : ''}
                onClick={promptHandler}
            >
                Generate
            </button>
        </div>
    )
}