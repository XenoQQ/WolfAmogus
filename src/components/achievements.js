import styled, { keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentCaseAtom, currentAchievementAtom } from "../state/atoms";
import { useEffect, useRef, useState } from "react";
import { caseParams } from "../params/caseParams";

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(130px);
  }
  40% {
    transform: translateY(130px);
  }
  60% {
    transform: translateY(130px);
  }
  80% {
    transform: translateY(130px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Frame = styled.div`
    position: absolute;
    z-index: 9999;

    display: flex;

    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);
`;

const Popup = styled.div`
    position: absolute;
    left: calc(20% - 2vw);
    top: 16vh;

    display: flex;

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

const Title = styled.div`
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

const List = styled.div`
    display: flex;

    width: 90%;
    height: 35vh;

    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const Element = styled.div`
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
const ElementTitle = styled.div`
    z-index: 1000;

    display: flex;

    width: 100%;
    height: 8vh;

    font-size: 2vh;

    align-items: center;
    justify-content: center;

    text-align: center;
`;

const ElementText = styled.div`
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

const Button = styled.div`
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

const Notification = styled.div`
    position: absolute;

    top: -110px;
    left: calc(50% - 150px);

    display: flex;

    width: 300px;
    height: 100px;

    font-family: "Pacifico", cursive;
    font-size: 2vh;

    color: black;
    background-color: #32aefc;
    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: flex-start;

    flex-direction: column;

    z-index: 9999;

    animation: ${moveUpDown} 5s infinite;
`;

const Achievements = () => {
    const [currentCase, setCurrentCase] = useRecoilState(currentCaseAtom);

    const currentAchievement = useRecoilValue(currentAchievementAtom);

    const paramsByCase = caseParams[currentCase];

    const achievementListRef = useRef([
        {
            id: 1,
            title: "Одна ошибка, и ты ошибся",
            text: "Проиграй в игре",
            isDone: false,
        },
        { id: 2, title: "Мастермайнд", text: "Победи в игре", isDone: false },
        {
            id: 3,
            title: "Какой-то шото как будто бы обед будет?",
            text: "Оставь на берегу тех, кто не ест друг-друга",
            isDone: false,
        },
        {
            id: 4,
            title: "Регата",
            text: "Перемести лодку 30 раз за игру",
            isDone: false,
        },
        {
            id: 5,
            title: "Секунду, я сверюсь с правилами!",
            text: "Открой правила",
            isDone: false,
        },
        {
            id: 6,
            title: "Спидраннер",
            text: "Выиграй игру меньше, чем за минуту",
            isDone: false,
        },
    ]);

    let isWaitingRef = useRef(false);
    let funcQueueRef = useRef([]);
    let currentTextRef = useRef(null);

    const queue = (func, waitTime) => {
        const executeFunc = (params) => {
            isWaitingRef.current = true;
            func(params);
            setTimeout(play, waitTime);
        };

        const play = () => {
            isWaitingRef.current = false;
            handleAchievementDismiss();
            if (funcQueueRef.current.length) {
                const params = funcQueueRef.current.shift();
                executeFunc(params);
            }
        };

        return (params) => {
            isWaitingRef.current ? funcQueueRef.current.push(params) : executeFunc(params);
        };
    };

    let [notificationStatus, setNotificationStatus] = useState({ visible: false, text: null });

    const handleAchievementShow = (achievementText) => {
        setNotificationStatus({ visible: true, text: achievementText });
    };

    const handleAchievementDismiss = () => {
        setNotificationStatus({ ...notificationStatus, visible: false });
    };

    const queuedAchievementShow = queue(handleAchievementShow, 5000);

    useEffect(() => {
        const currentAchievementToShow = achievementListRef.current.find((achievement) => achievement.title === currentAchievement);

        if (currentAchievementToShow?.isDone === false) {
            currentTextRef.current = currentAchievementToShow.title;
            queuedAchievementShow(currentTextRef.current);
        }

        achievementListRef.current = achievementListRef.current.map((achievement) =>
            achievement.title === currentAchievement ? { ...achievement, isDone: true } : achievement
        );
    }, [currentAchievement]);

    const handleContinue = () => {
        setCurrentCase("onPlay");
    };

    return (
        <>
            {paramsByCase.achievementListVisible && (
                <Frame>
                    <Popup>
                        <Title>Достижения</Title>
                        <List>
                            {achievementListRef.current.map((currentAchievement) => (
                                <Element key={currentAchievement.id}>
                                    <ElementTitle>{currentAchievement.title}</ElementTitle>
                                    <ElementText className={`${currentAchievement.isDone}`}>{currentAchievement.text}</ElementText>
                                </Element>
                            ))}
                        </List>
                        <Button onClick={handleContinue}>Продолжить</Button>
                    </Popup>
                </Frame>
            )}
            {notificationStatus.visible && (
                <Notification>
                    <h3>Разблокировано достижение:</h3>
                    {notificationStatus.text}
                </Notification>
            )}
        </>
    );
};

export default Achievements;
