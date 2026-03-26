import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import Bottom from "./Navigation/Bottom";
import Top from "./Navigation/Top";

export default function ProgramNavbar() {
    const [show, setShow] = useState(false);
    const [showBottom, setShowBottom] = useState(false);
    const { data, state, enrollLoderState } = useSelector(
        (state) => state.program
    );
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
        setCurrentSection(data?.sections[0]);
    }, [data?.sections]);

    const controlNavbar = useCallback(() => {
        if (Array.isArray(data?.sections)) {
            for (const section of data.sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop - window.scrollY <= 100) {
                    setCurrentSection(section);
                }
            }
        }

        if (window.scrollY > 300) {
            setShow(true);
        } else {
            setShow(false);
        }

        const bottomReached =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000;
        if (bottomReached) {
            setShowBottom(false);
        } else if (window.scrollY > 1000) {
            setShowBottom(true);
        } else {
            setShowBottom(false);
        }
        // if (window.scrollY > 1000) {
        //   setShowBottom(true);
        // } else {
        //   setShowBottom(false);
        // }
    }, [data]);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);

        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [controlNavbar]);

    return (
        <>
            <div className="w-full sticky z-30 bg-white drop-shadow font-circular">
                <Navbar />
            </div>
            {state === "success" && (
                <>
                    <Top
                        data={data}
                        show={show}
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                    />
                    {data?.type !== "verticalPage" && (
                        <Bottom
                            data={data}
                            enrollLoderState={enrollLoderState}
                            showBottom={showBottom}
                        />
                    )}
                </>
            )}
        </>
    );
}
