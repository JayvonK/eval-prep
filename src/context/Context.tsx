'use client'

import { createContext, useContext, useState } from "react"

// Interface
interface IContextValue {
    advice: string,
    setAdvice: (a: string) => void
}

// Create Context
export const Context = createContext<IContextValue>({} as IContextValue);

// Create App Wrapper
export const AppWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    
    const [advice, setAdvice] = useState<string>('');

    return (
        <Context.Provider value={{advice, setAdvice}}>
            {children}
        </Context.Provider>
    )
}

// Return useContext
export const useAppContext = () => {
    return useContext(Context);
}