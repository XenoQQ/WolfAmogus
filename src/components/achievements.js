import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentMainframeState, currentTimerIsRunning } from "../state/atoms";

const AchZone = styled.div`
    display: flex;

    position: absolute;

    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);

    z-index: 9999;
`;

const AchPopup = styled.div`
    display: flex;

    position: absolute;
    left: calc(20% - 2vw);
    top: 16vh;

    width: calc(60% - 0.7vw);
    height: 60vh;

    padding: 2vw;

    font-family: "Pacifico", cursive;
    font-size: 2.5vh;

    background-color: #32aefc;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    flex-direction: column;

    justify-content: space-between;
    align-items: center;
`;

const AchTitle = styled.div`
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

const AchButton = styled.div`
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

const Achievements = () => {
    const [mainframeState, setMainframeState] = useRecoilState(
        currentMainframeState
    );
    const setTimerIsRunning = useSetRecoilState(currentTimerIsRunning);

    const handleContinue = () => {
        setMainframeState("onPlay");
        setTimerIsRunning(true);
    };

    return (
        <>
            <AchZone
                style={{
                    display:
                        mainframeState === "onAchievementList"
                            ? "flex"
                            : "none",
                }}
            >
                <AchPopup>
                    <AchTitle>Достижения</AchTitle>
                    <AchButton onClick={handleContinue}>Продолжить</AchButton>
                </AchPopup>
            </AchZone>
        </>
    );
};

export default Achievements;
