import { ChangeEvent, ChangeEventHandler, SetStateAction } from "react"


interface inputProps{
    placeholder?: string
    type?: "text"|"email"|"tel"|"password"
    name?: string
    setValue?: Function
}

export default function Input({placeholder, type, name, setValue}:inputProps) {
    const handleChange = (e:any) => {
        setValue(e.target.value)
    }
    return(
        <input type = {type} name = {name} placeholder={placeholder} onChange = {(e)=> handleChange(e)}className="border-gray-300 p-2 border-2 rounded-lg"/>
    )
}