import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentMainframeState, currentTimerIsRunning, currentAchievementList } from "../state/atoms";

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
    height: 55vh;

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

const AchPopupTitle = styled.div`
    display: flex;

    width: calc(100% / 4);
    height: 7vh;
    font-family: "Pacifico", cursive;
    font-size: 4vh;
    color: black;

    background-color: #32aefc;

    align-items: center;
    justify-content: center;
`;

const AchList = styled.div`
    display: flex;

    width: 90%;
    height: 35vh;

    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const Ach = styled.div`
    display: flex;

    width: 30%;
    height: 14vh;

    background: #c98343;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    flex-flow: column;
    align-items: center;
    justify-content: space-between;
`;
const AchTitle = styled.div`
    display: flex;

    width: 100%;
    height: 8vh;

    font-size: 2vh;

    align-items: center;
    justify-content: center;

    text-align: center;

    z-index: 1000;
`;

const AchText = styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    font-size: 2vh;

    background: ${(props) => (props.className.includes("false") ? `white` : `green`)};

    border-bottom-left-radius: 0.5vw;
    border-bottom-right-radius: 0.5vw;

    align-items: center;
    justify-content: center;

    text-align: center;
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
    const [mainframeState, setMainframeState] = useRecoilState(currentMainframeState);
    const [achievementList, setAchievementList] = useRecoilState(currentAchievementList);
    const setTimerIsRunning = useSetRecoilState(currentTimerIsRunning);

    const handleContinue = () => {
        setMainframeState("onPlay");
        setTimerIsRunning(true);
    };

    

    return (
        <>
            <AchZone
                style={{
                    display: mainframeState === "onAchievementList" ? "flex" : "none",
                }}
            >
                <AchPopup>
                    <AchPopupTitle>Достижения</AchPopupTitle>
                    <AchList>
                        {achievementList.map((achievement) => (
                            <Ach key={achievement.id}>
                                <AchTitle>{achievement.title}</AchTitle>
                                <AchText className={`${achievement.isDone}`}>{achievement.text}</AchText>
                            </Ach>
                        ))}
                    </AchList>
                    <AchButton onClick={handleContinue}>Продолжить</AchButton>
                </AchPopup>
            </AchZone>
        </>
    );
};

export default Achievements;
