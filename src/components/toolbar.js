import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { currentFieldsState, currentBoatState, currentMainframeState, currentTimer, currentTimerIsRunning } from "../state/atoms";

import Timer from "./timer";

import Ach from "../assets/ach.png";
import Question from "../assets/question.png";
import Reset from "../assets/reset.png";

const ToolbarFrame = styled.div`
    position: absolute;
    top: 3vh;

    display: flex;

    width: 100%;
    height: 8vh;

    background: none;

    align-items: center;
    justify-content: space-between;
`;

const GameTitle = styled.div`
    display: flex;

    width: 20%;
    height: 7vh;

    margin-left: calc(2.5% - 0.35vw);

    font-family: "Pacifico", cursive;
    font-size: 3.4vh;

    color: black;
    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;
    background-color: #32aefc;

    align-items: center;
    justify-content: center;
`;

const ButtonSection = styled.div`
    display: flex;

    width: 20%;
    height: 100%;

    margin-right: 2.5%;

    justify-content: space-between;
`;

const Button = styled.button`
    height: 100%;
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

const Toolbar = () => {
    //////////////////////////////////////////[REFACTORED]//////////////////////////////////////////

    const setFields = useSetRecoilState(currentFieldsState);
    const setBoatStatus = useSetRecoilState(currentBoatState);
    const setMainframeState = useSetRecoilState(currentMainframeState);

    /// OLD CODE////////////////////////////////////////////////////////////////////////////////////////////////////////

    const setTimer = useSetRecoilState(currentTimer);
    const setTimerIsRunning = useSetRecoilState(currentTimerIsRunning);

    const handleAch = () => {
        setMainframeState("onAchievementList");
    };

    const handleReset = () => {
        setFields([
            {
                id: 1,
                title: "Левый берег",

                items: [
                    { id: 1, title: "Волк" },
                    { id: 2, title: "Овца" },
                    { id: 3, title: "Капуста" },
                ],
            },
            { id: 2, title: "Река", items: [] },
            { id: 3, title: "Правый берег", items: [] },
        ]);
        setBoatStatus("onLeft");
    };

    const handleRules = () => {
        setMainframeState("onRules");
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
            <ToolbarFrame>
                <GameTitle>Переправляющаяся братва</GameTitle>
                <Timer />
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
            </ToolbarFrame>
        </>
    );
};

export default Toolbar;
