import {HeaderProps} from "../App.tsx";
import {useRef,} from "react";

const homeMenuName: string = "home";
const charactersMenuName: string = "characters";
const aboutMenuName: string = "about";

export const Header = ({onButtonClick}: HeaderProps) => {

    const homeBtn = useRef<HTMLButtonElement>(null);
    const charactersBtn = useRef<HTMLButtonElement>(null);
    const aboutBtn = useRef<HTMLButtonElement>(null);

    const clearBtnSelectionClasses = () => {

        if(homeBtn.current) homeBtn.current.classList.remove("button-selected");
        if(charactersBtn.current) charactersBtn.current.classList.remove("button-selected");
        if(aboutBtn.current) aboutBtn.current.classList.remove("button-selected");
    }

    return (
        <div className="header">

            <button
                ref={homeBtn}
                onClick={
                    () => {
                        onButtonClick(homeMenuName);
                        clearBtnSelectionClasses();
                        homeBtn.current && homeBtn.current.classList.add("button-selected");
                    }
                }
            >Home
            </button>

            <button
                ref={charactersBtn}
                onClick={() => {
                    onButtonClick(charactersMenuName);
                    clearBtnSelectionClasses();
                    charactersBtn.current && charactersBtn.current.classList.add("button-selected")
                }}
            >Characters
            </button>

            <button
                ref={aboutBtn}
                onClick={() => {
                    onButtonClick(aboutMenuName);
                    clearBtnSelectionClasses();
                    aboutBtn.current && aboutBtn.current.classList.add("button-selected")
                }
            }
            >About
            </button>
        </div>
    )
}