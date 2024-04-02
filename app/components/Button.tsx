"use client"
import {COLOR_PALETTE} from "./Constants"


class Styles {

    width: string
    height: string
    backgroundColor: string
    color: string
    borderRadius: string

    constructor({type="regular", color="white"}:ButtonProps){
        switch (type){
            case "small":
                this.width = "100px";
                this.height = "33px";
            break;
    
            case "regular":
                this.width = "150px";
                this.height = "50px";
            break;

            case "large":
                this.width = "200px";
                this.height = "66px";
        }
        this.backgroundColor = COLOR_PALETTE[color]
        this.color = (color == "white" ? "black" : "white")
        this.borderRadius = "10px"
    }
}   

interface ButtonProps {
    type?: "small" | "regular" | "large"
    color?: keyof typeof COLOR_PALETTE
    text: string
    callback: () => void
}
 /**
     * @param {string} type Size of button.
     * @param {string} color Color of background of button.
     * @param {string} text Text displayed on button.
     * @param {Function} callback Callback function that is called when button is clicked.
     * @description A simple button component that should honestly be replaced with 
     * something from a proper library because KD sucks at UI design.
 */
export default function Button({type, color, text, callback}:ButtonProps){

    const styles = new Styles({type, color} as ButtonProps)

    return(
        <button onClick= {callback} style={styles}>
                {text}
        </button>
    )
    
}

