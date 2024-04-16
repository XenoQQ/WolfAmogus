import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";

import { currentFieldStateAtom, currentCaseAtom, currentAchievementAtom } from "../state/atoms";

import Sand from "../assets/sand.jpg";
import Water from "../assets/water.png";
import Sheep from "../assets/amogus.png";
import Wolf from "../assets/auf.png";
import Letucce from "../assets/lettuce.png";
import Ship from "../assets/ship.png";

const PlayfieldFrame = styled.div`
    display: flex;

    width: 100%;
    height: 100vh;
`;

const Field = styled.div`
    display: flex;

    width: ${(props) => (props.title === "Река" ? "50%" : "25%")};
    height: 100vh;

    background: ${(props) =>
            props.title === "Река"
                ? `no-repeat ${props["data-boat-status"] === "onLeft" ? "left/60%" : "right/60%"} url(${Ship})`
                : "none"},
        ${(props) => (props.title === "Река" ? `center/15% url(${Water})` : `center/30% url(${Sand})`)};

    transition: 0.35s ease;

    align-items: center;
    justify-content: ${(props) => (props.title === "Река" ? "none" : "center")};
    flex-direction: ${(props) => (props.title === "Река" ? "row" : "column")};
`;

const Item = styled.div`
    width: ${(props) => (props["data-on-river"] ? "20%" : "40%")};
    aspect-ratio: 1/1;

    transform: translate(0, 0);

    margin: 5%;
    margin-left: ${(props) => (props["data-on-river"] ? (props["data-boat-status"] === "onLeft" ? "10%" : "50%") : "")};

    background: ${(props) =>
        props.title === "Волк"
            ? `no-repeat center url(${Wolf})`
            : props.title === "Овца"
            ? `no-repeat center url(${Sheep})`
            : props.title === "Капуста"
            ? `no-repeat center url(${Letucce})`
            : ""};
    background-size: 100%;

    transition: 0.35s ease;

    cursor: grab;
`;

const MoveButton = styled.button`
    position: absolute;
    left: 40%;
    bottom: 10vh;

    display: flex;

    width: 20%;
    height: 8vh;

    font-family: "Pacifico", cursive;
    font-size: 3.4vh;

    color: black;
    background-color: #32aefc;
    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Playfield = () => {
    const [currentFieldState, setCurrentFieldState] = useRecoilState(currentFieldStateAtom);

    const setCurrentCase = useSetRecoilState(currentCaseAtom);
    const setUnlockedAchievement = useSetRecoilState(currentAchievementAtom);

    const [currentField, setCurrentField] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const dragStartHandler = (e, field, item) => {
        setCurrentField(field);
        setCurrentItem(item);
    };

    const dragOverHandler = (e, field) => {
        e.preventDefault();

        const isField = e.target.className.includes("Field");

        if (field.id !== currentField.id) {
            if (
                isField &&
                !((field.id - currentField.id) % 2 === 0) &&
                !(field.title === "Река" && field.items.length >= 1) &&
                !(field.title === "Река" && currentField.id === 1 && currentFieldState.boat === "onRight") &&
                !(field.title === "Река" && currentField.id === 3 && currentFieldState.boat === "onLeft") &&
                !(currentField.id === 2 && field.id === 1 && currentFieldState.boat === "onRight") &&
                !(currentField.id === 2 && field.id === 3 && currentFieldState.boat === "onLeft")
            ) {
                e.target.style.boxShadow = "0 0 0.7vw 0.7vw white inset";
            } else if (
                isField &&
                ((field.id - currentField.id) % 2 === 0 ||
                    (field.title === "Река" && field.items.length >= 1) ||
                    (field.title === "Река" && currentField.id === 1 && currentFieldState.boat === "onRight") ||
                    (field.title === "Река" && currentField.id === 3 && currentFieldState.boat === "onLeft") ||
                    (currentField.id === 2 && field.id === 1 && currentFieldState.boat === "onRight") ||
                    (currentField.id === 2 && field.id === 3 && currentFieldState.boat === "onLeft"))
            ) {
                e.target.style.boxShadow = "0 0 1.4vw 0.35vw red inset, 0 0 1.4vw 0.35vw white inset";
            }
        }
    };

    const dragLeaveHandler = (e) => {
        if (e.relatedTarget) {
            const relatedTarget = e.relatedTarget;
            if (relatedTarget.parentElement) {
                if (e.target.title !== relatedTarget.parentElement.title) {
                    e.target.style.boxShadow = "none";
                }
            }
        }
    };

    const dropHandler = (e, field, item) => {
        e.preventDefault();

        if (currentField.id === field.id) {
            const currentIndex = currentField.items.indexOf(currentItem);
            const dropIndex = field.items.indexOf(item);
            const newField = [...field.items];

            [newField[currentIndex], newField[dropIndex]] = [newField[dropIndex], newField[currentIndex]];

            setCurrentFieldState((prevState) => {
                const newFields = prevState.fields.map((field) => {
                    if (field.id === currentField.id) {
                        return { ...field, items: newField };
                    }
                    return field;
                });

                return { ...prevState, fields: newFields };
            });
        }
    };

    const dropItemHandler = (e, field) => {
        e.target.style.boxShadow = "none";
        e.target.parentElement.style.boxShadow = "none";
        if (
            currentField.id !== field.id &&
            !((field.id - currentField.id) % 2 === 0) &&
            !(field.title === "Река" && field.items.length >= 1) &&
            !(field.title === "Река" && currentField.id === 1 && currentFieldState.boat === "onRight") &&
            !(field.title === "Река" && currentField.id === 3 && currentFieldState.boat === "onLeft") &&
            !(currentField.id === 2 && field.id === 1 && currentFieldState.boat === "onRight") &&
            !(currentField.id === 2 && field.id === 3 && currentFieldState.boat === "onLeft")
        ) {
            const newFieldItems = [...field.items, currentItem];
            const newCurrentFieldItems = [...currentField.items];
            const currentIndex = newCurrentFieldItems.indexOf(currentItem);
            newCurrentFieldItems.splice(currentIndex, 1);

            setCurrentFieldState((prevState) => {
                const newFields = prevState.fields.map((f) => {
                    if (f.id === field.id) {
                        return { ...f, items: newFieldItems };
                    }
                    if (f.id === currentField.id) {
                        return { ...f, items: newCurrentFieldItems };
                    }
                    return f;
                });

                return { ...prevState, fields: newFields };
            });
        }
    };

    const toggleBoat = () => {
        setCurrentFieldState((prevState) => ({ ...prevState, boat: prevState.boat === "onLeft" ? "onRight" : "onLeft" }));
    };

    let isWaitingRef = useRef(undefined);
    let funcQueueRef = useRef([]);

    let toggleBoatQueue = (func, waitTime) => {
        const executeFunc = () => {
            isWaitingRef.current = true;
            func();
            setTimeout(nextFunc, waitTime);
        };

        const nextFunc = () => {
            isWaitingRef.current = false;
            if (funcQueueRef.current.length) {
                funcQueueRef.current.shift();
                executeFunc();
            }
        };

        return () => {
            isWaitingRef.current ? funcQueueRef.current.push(func) : executeFunc();
        };
    };

    const queuedToggleBoat = toggleBoatQueue(toggleBoat, 3000);

    useEffect(() => {
        const westCoast = currentFieldState.fields.find((field) => field.title === "Левый берег")?.items;
        const eastCoast = currentFieldState.fields.find((field) => field.title === "Правый берег")?.items;

        const isItemsTogether = (coast, item1, item2) => {
            return coast.some((item) => item.title === item1) && coast.some((item) => item.title === item2);
        };

        if (
            (westCoast.length === 2 &&
                currentFieldState.boat === "onRight" &&
                (isItemsTogether(westCoast, "Волк", "Овца") || isItemsTogether(westCoast, "Овца", "Капуста"))) ||
            (eastCoast.length === 2 &&
                currentFieldState.boat === "onLeft" &&
                (isItemsTogether(eastCoast, "Волк", "Овца") || isItemsTogether(eastCoast, "Овца", "Капуста")))
        ) {
            setTimeout(() => {
                setCurrentCase("onDefeat");
            }, 350);
            setUnlockedAchievement("Одна ошибка, и ты ошибся");
        }

        if (eastCoast.length === 3) {
            setTimeout(() => {
                setCurrentCase("onSuccess");
            }, 350);
            setUnlockedAchievement("Мастермайнд");
        }
    }, [currentFieldState]);

    return (
        <>
            <PlayfieldFrame>
                <MoveButton
                    onClick={() => {
                        queuedToggleBoat();
                    }}
                >
                    Переправить
                </MoveButton>
                {currentFieldState.fields.map((field) => (
                    <Field
                        key={field.id}
                        onDragOver={(e) => dragOverHandler(e, field)}
                        onDrop={(e) => dropItemHandler(e, field)}
                        onDragLeave={(e) => dragLeaveHandler(e, field)}
                        title={field.title}
                        className="Field"
                        data-boat-status={currentFieldState.boat}
                    >
                        {field.items.map((item) => (
                            <Item
                                key={item.id}
                                draggable={true}
                                onDragStart={(e) => dragStartHandler(e, field, item)}
                                onDrop={(e) => dropHandler(e, field, item)}
                                title={item.title}
                                data-boat-status={currentFieldState.boat}
                                data-on-river={field.title === "Река"}
                            ></Item>
                        ))}
                    </Field>
                ))}
            </PlayfieldFrame>
        </>
    );
};

export default Playfield;
