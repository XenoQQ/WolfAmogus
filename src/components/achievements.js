import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentCaseAtom, currentAchievementAtom } from "../state/atoms";
import { useEffect, useRef, useState } from "react";
import { caseParams } from "../params/caseParams";

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

    top: ${(props) => (props["data-position"] === "visible" ? "20px" : "-110px")};
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
    justify-content: center;

    z-index: 9999;
    transition: 0.35s ease;
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

    let [notificationStatus, setNotificationStatus] = useState({ active: false, visible: "hidden" });

    const handleAchievmentShow = () => {
        setNotificationStatus((prevstatus) => ({ ...prevstatus, active: true }));
        setTimeout(() => {
            setNotificationStatus((prevstatus) => ({ ...prevstatus, visible: "visible" }));
        }, 10);
        setTimeout(() => {
            setNotificationStatus((prevstatus) => ({ ...prevstatus, visible: "hidden" }));
        }, 3000);
        setTimeout(() => {
            setNotificationStatus((prevstatus) => ({ ...prevstatus, active: false }));
        }, 6000);
    };

    const queue = (func, waitTime) => {
        const funcQueue = [];
        let isWaiting;

        const executeFunc = (queueParams) => {
            isWaiting = true;
            func(queueParams);
            setTimeout(play, waitTime);
            console.log(funcQueue)
        };

        const play = () => {
            isWaiting = false;
            if (funcQueue.length) {
                const queueParams = funcQueue.shift();
                executeFunc(queueParams);
            }
        };

        return (queueParams) => {
            isWaiting ? funcQueue.push(queueParams) : executeFunc(queueParams);
        };
    };

    useEffect(() => {
        const isAchievementUnlocked = achievementListRef.current.find((achievement) => achievement.title === currentAchievement);

        /* if (isAchievementUnlocked?.isDone === false) {
            handleAchievmentShow();
        } */

        queue(handleAchievmentShow(), 3000);

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
            {notificationStatus.active && <Notification data-position={notificationStatus.visible} />}
        </>
    );
};

export default Achievements;
