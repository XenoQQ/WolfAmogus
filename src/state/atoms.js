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
