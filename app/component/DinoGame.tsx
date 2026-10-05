"use client"

import { useEffect, useState, useRef } from "react"


export default function DinoGame() {

    const [dinoY, setDinoY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacleX, setObstacleX] = useState(900);
    const [isgameStatus, setGameStatus] = useState(false);

    const velocity = useRef(0);
    const gravity = 0.8;

    const dinoRef = useRef<HTMLDivElement>(null);
    const obstacleRef = useRef<HTMLDivElement>(null);




    useEffect(() => {
        const handleKeySpace = (event: KeyboardEvent) => {
            if (event.code === "Space" || event.code === "ArrowUp") {

                

                setIsJumping(true);

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



            velocity.current -= gravity;
            setObstacleX((obstacleX) => {
                let newX = obstacleX - 5;
                if (newX <= 0) {
                    newX = 900;
                    obstacleX - 5;

                }




                return newX;
            })



            setDinoY((currentY) => {
                let newY = currentY + velocity.current;
                if (newY <= 0) {
                    newY = 0;
                    velocity.current = 0;
                    setIsJumping(false);
                }
                return newY
            })

            const dino = dinoRef.current;
            const obstacle = obstacleRef.current;


            if (dino && obstacle) {
                const dinoRect = dino.getBoundingClientRect()
                const obstacleRect = obstacle.getBoundingClientRect();


                const dinoBox = {
                    left: dinoRect.left + 10,
                    right: dinoRect.right - 10,
                    top: dinoRect.top + 10,
                    bottom: dinoRect.bottom - 5,
                };

                const obstacleBox = {
                    left: obstacleRect.left + 10,
                    right: obstacleRect.right - 10,
                    top: obstacleRect.top + 10,
                    bottom: obstacleRect.bottom - 5,
                };

                const isCollision =
                    dinoBox.right > obstacleBox.left &&
                    dinoBox.left < obstacleBox.right &&
                    dinoBox.bottom > obstacleBox.top &&
                    dinoBox.top < obstacleBox.bottom;

                if (isCollision) {
                    console.log("Game Over")
                    setGameStatus(false);
                    return;
                }


            }




            requestAnimationFrame(gameLoop);
        };

        requestAnimationFrame(gameLoop);

    }, []);



    return (
        <>
            <div className="relative h-[300px] w-[900px] overflow-hidden border-2 border-black bg-white">

                {/* Dino */}
                <div ref={dinoRef} className="absolute  left-[80px] text-5xl"
                    style={{
                        bottom: `${dinoY}px`,
                        transform: "scaleX(-1)"
                    }}
                >
                    🦖
                </div>

                <div ref={obstacleRef} className="absolute bottom-0 text-5xl "
                    style={{ left: `${obstacleX}px` }}
                >
                    🌵

                </div>

                {/* Ground */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />


               

            </div>
        </>
    )
}