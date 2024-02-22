import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentMainframeState, currentTimerIsRunning, currentTimer } from "../state/atoms";
import styled from "styled-components";

const PopupsFrame = styled.div`
    display: flex;

    position: absolute;

    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);

    z-index: 9999;
`;

const Popup = styled.div`
    display: flex;

    position: absolute;
    left: calc(20% - 2vw);
    top: 26vh;

    width: calc(60% - 0.7vw);
    height: 40vh;

    padding: 2vw;

    font-family: "Pacifico", cursive;
    font-size: 2.5vh;

    text-align: center;

    background-color: #32aefc;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    flex-direction: column;

    justify-content: space-between;
    align-items: center;
`;

const PopupTitle = styled.div`
    display: flex;

    width: calc(100% / 4);
    height: 7vh;
    font-family: "Pacifico", cursive;
    font-size: 5vh;
    color: black;

    background-color: #32aefc;

    align-items: center;
    justify-content: center;
`;

const PopupButton = styled.div`
    display: flex;

    width: calc(100% / 4);
    height: 7vh;
    font-family: "Pacifico", cursive;
    font-size: 3.5vh;
    color: black;

    background-color: #32aefc;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Popups = ({ handleReset }) => {
    
    const [currentPopupText, setCurrentPopupText] = useState("");
    const [mainframeState, setMainframeState] = useRecoilState(currentMainframeState);

    const setTimerIsRunning = useSetRecoilState(currentTimerIsRunning);
    const setTimer = useSetRecoilState(currentTimer);

    useEffect(() => {
        let currentText =
            mainframeState === "onNewGame"
                ? [
                      "Переправа",
                      "Однажды крестьянину понадобилось перевезти через реку волка, козу и капусту. У крестьянина есть лодка, в которой может поместиться, кроме самого крестьянина, только один объект — или волк, или коза, или капуста. Если крестьянин оставит без присмотра волка с козой, то волк съест козу; если крестьянин оставит без присмотра козу с капустой, коза съест капусту. В присутствии же крестьянина «никто никого не ест». Как крестьянину перевезти на другой берег всё своё имущество в целости и сохранности?",
                      "Играть",
                  ]
                : mainframeState === "onDefeat"
                ? ["Неправильно", "Попробуй ещё раз!", "Начать заново"]
                : mainframeState === "onRules"
                ? [
                      "Переправа",
                      "Однажды крестьянину понадобилось перевезти через реку волка, козу и капусту. У крестьянина есть лодка, в которой может поместиться, кроме самого крестьянина, только один объект — или волк, или коза, или капуста. Если крестьянин оставит без присмотра волка с козой, то волк съест козу; если крестьянин оставит без присмотра козу с капустой, коза съест капусту. В присутствии же крестьянина «никто никого не ест». Как крестьянину перевезти на другой берег всё своё имущество в целости и сохранности?",
                      "Продолжить",
                  ]
                : mainframeState === "onSuccess"
                ? ["Победа!", "Ты молодец, это было славно ;)", "Начать заново"]
                : "";
        setCurrentPopupText(currentText);
    }, [mainframeState]);

    const handlePopupButtonClick = () => {
        if (mainframeState === "onNewGame" || mainframeState === "onRules") {
            setMainframeState("onPlay");
        }

        if (mainframeState === "onDefeat" || mainframeState === "onSuccess") {
            setMainframeState("onPlay");
            handleReset();
            setTimer(0);
        }

        setTimerIsRunning(true);
    };

    return (
        <PopupsFrame
            style={{
                display: mainframeState === "onPlay" || mainframeState === "onAchievementList" ? "none" : "flex",
            }}
        >
            <Popup>
                <PopupTitle>{currentPopupText[0]}</PopupTitle>
                {currentPopupText[1]}
                <PopupButton onClick={handlePopupButtonClick}>{currentPopupText[2]}</PopupButton>
            </Popup>
        </PopupsFrame>
    );
};

export default Popups;
