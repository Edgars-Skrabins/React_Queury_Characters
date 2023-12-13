
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Home} from "./home.tsx";
import {Characters} from "./characters.tsx";
import {About} from "./about.tsx";

export const Header = () => {

    const clearSelectedStyles = () => {
        const elements = document.querySelectorAll('.selected');
        elements.forEach((e) => {
            e.classList.remove("selected");
        })
    }

    return (
        <Router>
            <nav>
                <ul className="header">
                    <li>
                        <Link
                            to="/home"
                            onClick={(e) => {
                                clearSelectedStyles();
                                e.currentTarget.classList.add("selected");
                            }}
                        >Home</Link>
                    </li>
                    <li>
                        <Link
                            to="/characters"
                            onClick={(e) => {
                                clearSelectedStyles();
                                e.currentTarget.classList.add("selected");
                            }}
                        >Characters</Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            onClick={(e) => {
                                clearSelectedStyles();
                                e.currentTarget.classList.add("selected");
                            }}
                        >About</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}