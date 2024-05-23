'use client'

import { GetAdviceAPI } from '@/Services/DataServices'
import { useAppContext } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Creating a form where user has two inputs, name & favorite food
// When both inputs are filled, there is a submit button, but when they are not filled, it is a clear button
// When you press submit button, form disappears and page says thank you for your submission

const JacobLecturePage = () => {
    const pageContext = useAppContext();

    const route = useRouter();

    const handleGoBackToIsaiah = () => {
        route.push('/')
    }

    const [form, setForm] = useState({Name: '', Food: ''})

    const [submit, setSubmit] = useState<boolean>(false);

    let isFilled = form.Name !== '' && form.Food !== '';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleClick = () => {
        if(isFilled) {
            setSubmit(true);
        } else {
            setForm({Name: '', Food: ''})
        }
    }

    const getAdvice = async () => {
        let { advice } = await GetAdviceAPI();
        pageContext.setAdvice(advice);
    }

    useEffect(() => {
        if(pageContext.advice === ''){
            getAdvice();
        }
    }, [])

    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-md'>
                <h1 className='text-center text-4xl'>Jacob Lecture</h1>
                <form className={`mt-10 ${submit ? 'hidden' : ''}`}>
                    <h1 className='font-bold text-center text-3xl'>Favorite Food Form</h1>
                    <div className='p-6 bg-white mt-3'>

                        <label className='block text-black'>Name: </label>
                        <input type="text" className='border-black border w-full text-black' name='Name' value={form.Name} onChange={handleInputChange}/>

                        <label className='block text-black mt-3'>Fav Food: </label>
                        <input type="text" className='border-black border w-full text-black' name='Food' value={form.Food} onChange={handleInputChange}/>

                        <button type='button' className={`${isFilled ? 'bg-green-400' : 'bg-red-400'} rounded-sm mt-3 px-4 py-1`} onClick={handleClick}>{isFilled ? 'Submit' : 'Clear'}</button>

                    </div>
                </form>

                {submit && <p className='text-2xl text-center mt-10'>Thank you for your submission!</p>}

                <h3 className="text-2xl mt-10">Advice: <span className="font-bold text-green-600">{pageContext.advice}</span></h3>
                <button className='bg-white w-full text-black mt-2' onClick={getAdvice}>Get More Advice</button>


                <button className='mt-10 bg-white text-black py-1 w-full' onClick={handleGoBackToIsaiah}>Go Back to Isaiah Lecture</button>
            </div>

        </div>
    )
}

export default JacobLecturePage
