import { useState } from "react";
import Increment from "./Increment";
import Button from "./Button";
import Input from "./Input";
import { useEffect } from "react";

interface manifestProps{
    manifest: {name:string, quantity:number}[]
    setManifest: Function

}



export default function Manifest({manifest, setManifest}:manifestProps){

    useEffect(()=>{console.log(manifest)},[manifest])
    const [name, setName] = useState<string>(null)
    const [quantity, setQuantity] = useState<number>(null)

    function removeItem(item){
        const newManifest = [...manifest]
        const index = newManifest.indexOf(item)
        newManifest.splice(index,1)
        setManifest(newManifest)
    }



    return(

        <div className=" h-min min-h-40 flex flex-col items-center justify-center py-5 px-5 rounded-lg border-2 border-gray-400 bg-white">

            {manifest? manifest.map((item)=>{
                return(
                    <div className="flex w-full justify-between items-center px-16 py-2 ">
                        <div className="border-2 min-w-56 flex flex-col justify-between border-gray-300 rounded-md p-2"><div>Item: {item.name}</div> Quantity: {item.quantity}</div>
                        <Button text="X" type="regular" color="blue" callback={()=>removeItem(item)}/>
                    </div>)} ):null}
 

            <div className="flex w-full justify-evenly">
            <Input type="text" placeholder={name?name:"Add an item"} setValue={setName}/>
            <Increment value={quantity?quantity:0} setValue={setQuantity} increment={1}/>
            <Button text="Add Item" type="regular" color="green" callback={()=>{setManifest([...manifest,{name:name,quantity:quantity}])}}/>
            </div>
            
            
            
                
        </div>
    )
}