import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentMainframeState } from "../state/atoms";

const PopupZone = styled.div`
    display: none;

    position: absolute;

    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);

    z-index: 9999;
`;

const Popup = styled.div`
    display: flex;

    position: absolute;
    left: 20%;
    top: 20vh;

    padding: 25px;

    width: 60%;
    height: 60vh;

    font-family: "Pacifico", cursive;

    background-color: #32aefc;

    border: 5px solid #c98343;
    border-radius: 10px;

    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

const PopupTitle = styled.div`
    display: flex;

    width: calc(100% / 4);
    height: 50px;
    font-family: "Pacifico", cursive;
    font-size: 25px;
    color: black;

    background-color: #32aefc;

    border: 5px solid #c98343;
    border-radius: 10px;

    align-items: center;
    justify-content: center;
`;

const PopupButton = styled.div`
    display: flex;

    width: calc(100% / 4);
    height: 50px;
    font-family: "Pacifico", cursive;
    font-size: 25px;
    color: black;

    background-color: #32aefc;

    border: 5px solid #c98343;
    border-radius: 10px;

    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Popups = () => {
    const [currentPopupText, setCurrentPopupText] = useState("");
    const [mainframeState, setMainframeState] = useRecoilState(
        currentMainframeState
    );
    /*
    Possible states:
    onNewGame
    onPlay
    onSuccess  
    onDefeat
    onRules
    onAchievementList
    */

    useEffect(() => {
        let currentText =
            mainframeState === "onNewGame"
                ? [
                      "Переправа",
                      "Однажды крестьянину понадобилось перевезти через реку волка, козу и капусту. У крестьянина есть лодка, в которой может поместиться, кроме самого крестьянина, только один объект — или волк, или коза, или капуста. Если крестьянин оставит без присмотра волка с козой, то волк съест козу; если крестьянин оставит без присмотра козу с капустой, коза съест капусту. В присутствии же крестьянина «никто никого не ест». Как крестьянину перевезти на другой берег всё своё имущество в целости и сохранности?",
                      "Играть"
                  ]
                : "";
        setCurrentPopupText(currentText);
    }, [mainframeState]);

    return (
        <PopupZone>
            <Popup>
                <PopupTitle>{currentPopupText[0]}</PopupTitle>
                {currentPopupText[1]}
                <PopupButton>{currentPopupText[2]}</PopupButton>
            </Popup>
        </PopupZone>
    );
};

export default Popups;
