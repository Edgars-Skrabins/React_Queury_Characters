import {CharacterProps} from "./characters.tsx";

export const Character = ({id,name, age,interest,skill}:CharacterProps) => {
    return(
        <div className="character" key={id}>
            <h4> {name} </h4>
            <h6> Age </h6>
            <p> {age} </p>
            <h6> Interests</h6>
            <p> {interest} </p>
            <h6> Main Skill </h6>
            <p> {skill} </p>
        </div>
    )
}