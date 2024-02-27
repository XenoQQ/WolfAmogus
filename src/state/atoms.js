import { atom } from "recoil";

export const currentFieldsState = atom({
    key: "currentFieldsState",
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

export const currentBoatState = atom({
    key: "currentBoatState",
    default: "onLeft",
});

export const currentMainframeState = atom({
    key: "currentMainframeState",
    default: "onNewGame",
});

export const currentAchievementsVisible = atom({
    key: "currentAchievementsVisible",
    default: false,
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

export const currentAchievement = atom({
    key: "currentAchievement",
    default: null,
})