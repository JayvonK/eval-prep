'use client'

import PasswordInputComponent from "@/Components/PasswordInputComponent";
import { GetAdviceAPI } from "@/Services/DataServices";
import { useAppContext } from "@/context/Context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Pseudo
// Create Component for our password input
// Pass child component value to parent component
// Based off value, change color of rules (Uppercase, Number)

export default function Home() {

  const pageContext = useAppContext();

  const route = useRouter();

  const [password, setPassword] = useState<string>('');

  const [uppercase, setUppercase] = useState<boolean>(false);
  const [number, setNumber] = useState<boolean>(false);

  const changePassword = (p: string) => {
    setPassword(p);
      let count = 0;
      let count2 = 0;
      p.split('').forEach(char => {
        if(char === char.toUpperCase() && !Number(char)){
          count++;
        }else if(Number(char)){
          count2++
        }
      })
      count > 0 ? setUppercase(true) : setUppercase(false);
      count2 > 0 ? setNumber(true) : setNumber(false);
  }

  const handleGoToJacob = () => {
    route.push('/Pages/JacobLecturePage')
  }

  const grabAdvice = async () => {
    let { advice } = await GetAdviceAPI();
    pageContext.setAdvice(advice);
  }

  useEffect(() => {
    if (pageContext.advice === '') {
      grabAdvice()
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-md">
        <h1 className="text-center text-3xl mb-12">Isaiah Lecture Copy</h1>

        <PasswordInputComponent changePassword={changePassword} />

        <h3 className="text-2xl mt-10">Advice: <span className="font-bold text-green-600">{pageContext.advice}</span></h3>
        <button className='bg-white w-full text-black mt-2' onClick={grabAdvice}>Get More Advice</button>

        <button className="mt-10 bg-white text-black" onClick={handleGoToJacob}>Jacob Lecture</button>
      </div>

      <div>
        <p>Password Must Contain: <span className={`${uppercase ? "text-blue-600" : "text-red-600"}`}>Uppercase</span> | <span className={`${number ? "text-blue-600" : "text-red-600"}`}>Number</span></p>

        {/* Regex */}
        {/* <p>Password Must Contain: <span className={`${/[A-Z]/.test(password) ? "text-blue-600" : "text-red-600"}`}>Uppercase</span> | <span className={`${/[0-9]/.test(password) ? "text-blue-600" : "text-red-600"}`}>Number</span></p> */} 
      </div>


    </main>
  );
}
