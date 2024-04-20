import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { currentCaseAtom, currentTimerAtom, currentAchievementAtom } from "../state/atoms";
import { caseParams } from "../params/caseParams";

const TimerBar = styled.div`
    display: flex;

    width: calc(100% / 4 - 15%);
    height: 7vh;

    font-family: "Pacifico", cursive;
    font-size: 3.4vh;

    color: black;
    background-color: #32aefc;
    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: center;
`;

const Timer = () => {
    const [timer, setTimer] = useRecoilState(currentTimerAtom);

    const currentCase = useRecoilValue(currentCaseAtom);

    const setUnlockedAchievemet = useSetRecoilState(currentAchievementAtom);

    const paramsByCase = caseParams[currentCase];

    useEffect(() => {
        let interval = null;

        const startTimer = () => {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        };

        if (paramsByCase.timerActive) {
            startTimer();
        } else {
            clearInterval(interval);
        }

        if (currentCase === "onSuccess") {
            if (timer <= 60) {
                setUnlockedAchievemet("Спидраннер");
            }
        }

        return () => {
            clearInterval(interval);
        };
    }, [currentCase]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <>
            <TimerBar>{formatTime(timer)}</TimerBar>
        </>
    );
};

export default Timer;
