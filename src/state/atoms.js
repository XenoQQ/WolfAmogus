import { atom } from "recoil";

export const currentFieldStateAtom = atom({
    key: "currentFieldStateAtom",
    default: {
        fields: [
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
        boat: "onLeft",
    },
});

export const currentCaseAtom = atom({
    key: "currentCaseAtom",
    default: "onNewGame",
});

export const currentTimerAtom = atom({
    key: "currentTimerAtom",
    default: 0,
});

export const currentTimerResultsAtom = atom({
    key: "currentTimerResults",
    default: [],
});

export const currentAchievementAtom = atom({
    key: "currentAchievementAtom",
    default: null,
});
