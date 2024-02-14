import styled from "styled-components";
import Ach from "../assets/ach.png";
import Question from "../assets/question.png";
import Reset from "../assets/reset.png";
import { useSetRecoilState, useRecoilState } from "recoil";
import { currentMainframeState, currentTimer, currentTimerIsRunning } from "../state/atoms";
import { useEffect } from "react";

//////////////////////////////////////////[Styles section]//////////////////////////////////////////

const Bar = styled.div`
    position: absolute;

    display: flex;

    width: 100%;
    height: 8vh;
    margin: calc(2.5% - 0.35vw) 0 0 0;

    background: none;

    align-items: center;
    justify-content: space-between;
`;

const GameTitle = styled.div`
    display: flex;

    width: calc(100% / 4 - 5%);
    height: 7vh;

    margin: 0 0 0 calc(2.5% - 0.35vw);

    font-family: "Pacifico", cursive;
    font-size: 3.4vh;
    color: black;

    background-color: #32aefc;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: center;

    z-index: 100;
`;

const Timer = styled.div`
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

const ButtonSection = styled.div`
    display: flex;

    width: calc(100% / 4 - 5%);
    height: 8.4vh;

    margin: 0 calc(2.5% - 0.35vw) 0 0;

    z-index: 100;

    justify-content: space-between;
`;

const Button = styled.button`
    height: 8.4vh;
    aspect-ratio: 1/1;

    background: ${(props) =>
        props.className.includes("achievements")
            ? `no-repeat center/50% url(${Ach}), #c98343`
            : props.className.includes("restart")
            ? `no-repeat center/50% url(${Reset}), #c98343`
            : `no-repeat center/70% url(${Question}), #c98343`};

    border-style: none;

    border-radius: 1vh;

    cursor: pointer;
`;

const Toolbar = ({ handleReset }) => {
    //////////////////////////////////////////[States section]//////////////////////////////////////////

    const setMainframeState = useSetRecoilState(currentMainframeState);

    const [timer, setTimer] = useRecoilState(currentTimer);
    const [timerIsRunning, setTimerIsRunning] = useRecoilState(currentTimerIsRunning);

    //////////////////////////////////////////[Logic section]//////////////////////////////////////////

    const handleRules = () => {
        setMainframeState("onRules");
    };

    const handleAch = () => {
        setMainframeState("onAchievementList");
    };

    useEffect(() => {
        let interval = null;

        const startTimer = () => {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        };

        if (timerIsRunning) {
            startTimer();
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [setTimer, timerIsRunning]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const resetTimer = () => {
        setTimer(0);
        setTimerIsRunning(true);
    };

    const handleStopTimer = () => {
        setTimerIsRunning(false);
    };

    return (
        <>
            <Bar>
                <GameTitle>Переправляющаяся братва</GameTitle>
                <Timer>{formatTime(timer)}</Timer>
                <ButtonSection>
                    <Button
                        className="achievements"
                        onClick={() => {
                            handleAch();
                            handleStopTimer();
                        }}
                    />
                    <Button
                        className="restart"
                        onClick={() => {
                            handleReset();
                            resetTimer();
                        }}
                    />
                    <Button
                        className="rules"
                        onClick={() => {
                            handleRules();
                            handleStopTimer();
                        }}
                    />
                </ButtonSection>
            </Bar>
        </>
    );
};

export default Toolbar;
