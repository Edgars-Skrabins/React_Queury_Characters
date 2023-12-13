import {Character} from "./character.tsx";
import React, {useEffect, useState} from "react";
import {z} from 'zod';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export type CharacterProps = {
    id: number,
    name: string,
    age: number,
    interest: string,
    skill: string,
}

const characterSchema = z.object({
    name: z.string().refine((value) => /^[a-zA-Z\s]+$/.test(value), {
        message: "Name should only contain letters and spaces",
    }),
    age: z.number().min(1, {message: "Age should be at least 1"}).max(200, {
        message: "Age should be at most 200",
    }),
    interest: z.string(),
    skill: z.string(),
});

export const Characters = () => {

    const apiCharactersUrl = "http://localhost:3001/characters"

    const getCharacters = async () => {
        try {
            const response = await axios.get(apiCharactersUrl);
            console.log("Got data successfully", response.data);
            return response.data as CharacterProps[];
        } catch (error) {
            console.error("Error getting data", error);
        }
    }
    const {
        data: fetchedCharacters,
        isLoading,
        isError} = useQuery({ queryKey: ['characters'], queryFn: getCharacters })

    const [characters, setCharacters] = useState<CharacterProps[]>([]);

    const [inputName, setInputName] = useState("");
    const [inputAge, setInputAge] = useState("0");
    const [inputInterest, setInputInterest] = useState("");
    const [inputSkill, setInputSkill] = useState("");

    useEffect(() => {
        if(isLoading)
        {
            console.log("data loading");
        }

        if(isError)
        {
            console.log("error loading");
        }

        if (fetchedCharacters) {
            setCharacters(fetchedCharacters);
        }
    }, [fetchedCharacters])

    const handleCreateBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        createCharacterThroughForm();
    }

    const updateCharacterToDB = (newCharacter:CharacterProps) => {
        axios.post(apiCharactersUrl, {
            id:newCharacter.id,
            name:newCharacter.name,
            age:newCharacter.age,
            interest:newCharacter.interest,
            skill:newCharacter.skill
        })
            .then((response) => {
                console.log("Successfully updated database" + response);
            })
            .catch((error) => {
                console.error("Failed to update database" + error);
            })

    }

    const createCharacterThroughForm = () => {
        const newCharacter: CharacterProps = {
            id: Math.random(),
            name: inputName,
            age: Number(inputAge),
            interest: inputInterest,
            skill: inputSkill,
        }

        updateCharacterToDB(newCharacter);

        try {
            characterSchema.parse(newCharacter);
            const characterArr = [...characters];
            characterArr.push(newCharacter);
            setCharacters(characterArr);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(error.errors);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className="characters">

            <div className="characters__form-container">

                <form className="characters__form">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        maxLength={12}
                        className="characters__form-input"
                        onChange={(e) => setInputName(e.currentTarget.value)}
                    />
                    <input
                        type="number"
                        placeholder="Enter Age"
                        maxLength={3}
                        className="characters__form-input"
                        onChange={(e) => setInputAge(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Interest"
                        maxLength={18}
                        className="characters__form-input"
                        onChange={(e) => setInputInterest(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Skill"
                        maxLength={18}
                        className="characters__form-input"
                        onChange={(e) => setInputSkill(e.currentTarget.value)}
                    />

                    <button
                        className="characters__form-btn"
                        onClick={(e) => handleCreateBtnClick(e)}
                    > Create
                    </button>
                </form>
            </div>

            <div className="characters__list">
                {characters.map(({id,name, age, interest, skill}) => (
                    <Character
                        id={id}
                        key={id}
                        name={name}
                        age={age}
                        interest={interest}
                        skill={skill}
                        />
                ))}
            </div>

        </div>
    )
}