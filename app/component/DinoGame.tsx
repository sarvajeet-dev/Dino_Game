"use client"

import { useEffect, useState, useRef } from "react"


export default function DinoGame() {

    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);

    const velocity = useRef(0);
    const gravity = 0.8;

    useEffect(() => {
        const handleKeySpace = (event: KeyboardEvent) => {
            if (event.code === "Space" || event.code === "ArrowUp") {
                velocity.current += 15;
                setDinoY(velocity.current)
            }
        }




        window.addEventListener("keydown", handleKeySpace);


        return () => {
            window.removeEventListener('keydown', handleKeySpace);
        }
    }, [])


    useEffect(() => {
        const gameLoop = () => {
            console.log("game running");
            
            if (isJumping) {

                velocity.current -= gravity;
            }

            setDinoY((currentY) => currentY + velocity.current)


            requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);
    }, []);


    return (
        <>
            <div className="relative h-[300px] w-[900px] overflow-hidden border-2 border-black bg-white">

                {/* Dino */}
                <div className="absolute  left-[80px] text-5xl"
                    style={{ bottom: `${dinoY}px` }}
                >
                    🦖
                </div>

                {/* Ground */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />

            </div>
        </>
    )
}