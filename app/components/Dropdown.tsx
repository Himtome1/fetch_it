
import { useState } from "react";


interface dropDownProps {
    listArray : string[],
    bg: string,
    setItem: Function,
    itemColor: string,
    textColor: string
}


export default function Dropdown({listArray,bg,itemColor,setItem, textColor}:dropDownProps) {
    const BG = `bg-${bg}`
    const FG = `bg-${itemColor}`
    const TC = `text-${textColor}`
    return(
        <div className={`${BG} flex-col flex items-start justify-start rounded-lg p-2`}>
            {listArray.map((item)=>{
                return(
                    <button onClick = {(item)=>setItem(item)} className={`${FG} flex items-start justify-start p-1 m-1 rounded-md w-full ${TC}`}>
                        {item}
                    </button>
                )
            })}
        </div>
    )
}