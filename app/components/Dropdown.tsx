
import { useState } from "react";


interface dropDownProps {
    listArray : string[],
    bg: string,
    setItem: Function,
    itemColor: string,
    textColor: string
    item: string
}


export default function Dropdown({listArray,bg,itemColor,setItem,item, textColor}:dropDownProps) {

    const [visible, setVisible] = useState<boolean>(false)

    const BG = `bg-${bg}`
    const FG = `bg-${itemColor}`
    const TC = `text-${textColor}`
    return(
        <div className={`${BG} flex-col flex items-center w-64 min-h-11 justify-center rounded-lg border-2 border-gray-300 p-2`}>
            <button className={`${FG} flex items-center justify-center p-1 m-1 rounded-md w-full`} onClick = {()=>setVisible(!visible)}>{item?item:`Please Select`}</button>
            {visible ? listArray.map((item)=>{
                return(
                    <button onClick = {()=>{setItem(item), setVisible(false)}} className={`${FG} flex items-start justify-start hover:bg-blue-200 p-1 m-1 rounded-md w-full ${TC}`}>
                        {item}
                    </button>
                )
            }) :null}
        </div>
    )
}