import { ChangeEvent, ChangeEventHandler, SetStateAction } from "react"
import { useState } from "react"

interface inputProps{
    setValue?: Function
    value?: number
    increment?: number
}

export default function Increment({setValue,value,increment}:inputProps) {

    return(
        <div className="flex justify-center items-center">
            <button onClick= {()=>{setValue(value-increment), console.log(value)}} className="border-gray-300 hover:bg-red-200 bg-white p-2 border-2 flex rounded-lg">-</button>
            <div className="border-gray-300 py-2 px-3 border-2 flex font-bold rounded-lg bg-white">
                {value ? value.toFixed(1):0.0}
            </div>
            <button onClick = {()=>setValue(value+increment)} className="border-gray-300 p-2 border-2 hover:bg-green-200 flex rounded-lg bg-white">+</button>
            
        </div>
    )
}