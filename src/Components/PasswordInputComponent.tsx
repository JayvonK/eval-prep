import React from 'react'

const PasswordInputComponent = (props: { changePassword: (p: string) => void}) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.changePassword(e.target.value)
    } 

  return (
    <>
      <label>Password: </label>
      <input className='text-black' type="text" onChange={handleOnChange}/>
    </>
  )
}

export default PasswordInputComponent
