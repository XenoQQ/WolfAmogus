import { atom } from "recoil";

export const fieldsState = atom({
    key: "fieldsState",
    default: [
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
    ],
});

export const currentItemState = atom({
    key: "currentItemState",
    default: null,
});

export const currentFieldState = atom({
    key: "currentFieldState",
    default: null,
});

export const currentMainframeState = atom({
    key: "currentMainframeState",
    default: "onNewGame",
});

export const currentBoatStatus = atom({
    key: "currentBoatStatus",
    default: "onLeft",
});

export const currentTimer = atom({
    key: "currentTimer",
    default: 0,
});

export const currentTimerIsRunning = atom({
    key: "currentTimerIsRunning",
    default: false,
});

export const currentTimerResults = atom({
    key: "currentTimerResults",
    default: [],
});

export const currentAchievementStatus = atom({
    key: "currentAchievementStatus",
    default: [
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
    ],
});
