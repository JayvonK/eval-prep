'use client'

import { createContext, useContext, useState } from "react"

interface IContextValue {
    advice: string,
    setAdvice: (a: string) => void
}

export const Context = createContext<IContextValue>({} as IContextValue);

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

export const useAppContext = () => {
    return useContext(Context);
}