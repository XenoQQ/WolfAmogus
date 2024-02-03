///Utility modules
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
    fieldsState,
    currentFieldState,
    currentItemState,
    currentMainframeState,
} from "../state/atoms";
///Components
import Toolbar from "./toolbar";
import Popups from "./popups";
///Assets
import Sand from "../assets/sand.jpg";
import Water from "../assets/water.png";
import Sheep from "../assets/amogus.png";
import Wolf from "../assets/auf.png";
import Letucce from "../assets/lettuce.png";
import Ship from "../assets/ship.png";

//////////////////////////////////////////[Styles section]//////////////////////////////////////////

const MainWrapper = styled.div`
    display: flex;

    width: 100%;
    height: 100vh;
`;

const Field = styled.div`
    display: flex;

    width: ${(props) =>
        props.title === "Река" ? "calc(100%/2)" : "calc(100%/4)"};

    height: 100%;

    background: ${(props) =>
            props.title === "Река"
                ? `no-repeat ${
                      props.className.includes("onLeft")
                          ? `left/60%`
                          : `right/60%`
                  }  url(${Ship})`
                : `none`},
        ${(props) =>
            props.title === "Река"
                ? `center/15% url(${Water})`
                : `center/32% url(${Sand})`};

    align-items: center;
    justify-content: ${(props) => (props.title === "Река" ? `none` : "center")};

    flex-direction: ${(props) => (props.title === "Река" ? `row` : `column`)};

    transition: 0.35s ease;
`;

const Item = styled.div`
    width: ${(props) =>
        props.className.includes("Река") ? '19%' : '38%'};
    aspect-ratio: 1/1;

    background: ${(props) =>
        props.title === "Волк"
            ? `no-repeat center url(${Wolf})`
            : props.title === "Овца"
            ? `no-repeat center url(${Sheep})`
            : `no-repeat center url(${Letucce})`};
    background-size: 100%;

    margin: 5%;

    cursor: grab;

    transform: translate(0, 0);
    transition: 0.35s ease;

    margin-left: ${(props) =>
        props.className.includes("Река")
            ? props.className.includes("onLeft")
                ? "10%"
                : "50%"
            : ""};
`;

const MoveButton = styled.button`
    display: flex;

    position: absolute;
    left: calc(50% - (100% / 4 - 6.25%) / 2);
    top: 80vh;

    width: calc(100% / 4 - 6.25%);
    height: 7vh;

    font-family: "Pacifico", cursive;
    font-size: 3.5vh;
    color: black;

    background-color: #32aefc;

    border: 5  solid #c98343;
    border-radius: 10px;

    align-items: center;
    justify-content: center;

    cursor: pointer;
`;

const Mainframe = () => {
    useEffect(() => {
        console.log("Mainframe rendered");
    }, []);

    //////////////////////////////////////////[States section]//////////////////////////////////////////

    //////////[Mainframe state]///////////

    const [mainframeState, setMainFrameState] = useRecoilState(
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

    //////////[Game logic states]///////////

    const [fields, setFields] = useRecoilState(fieldsState);
    const [currentField, setCurrentField] = useRecoilState(currentFieldState);
    const [currentItem, setCurrentItem] = useRecoilState(currentItemState);

    const [currentBoatStatus, setCurrentBoatStatus] = useState("onLeft");

    //////////////////////////////////////////[Logic section]//////////////////////////////////////////

    const toggleBoatStatus = () => {
        setCurrentBoatStatus((prevStatus) =>
            prevStatus === "onLeft" ? "onRight" : "onLeft"
        );
    };

    const dragStartHandler = (e, field, item) => {
        setTimeout(() => {
            setCurrentField(field);
            setCurrentItem(item);
        }, 1);
    };

    const dragOverHandler = (e, field) => {
        e.preventDefault();
        if (field.id !== currentField.id) {
            if (
                e.target.className.includes("Field") &&
                !((field.id - currentField.id) % 2 === 0) &&
                !(field.title === "Река" && field.items.length >= 1) &&
                !(
                    field.title === "Река" &&
                    currentField.id === 1 &&
                    currentBoatStatus === "onRight"
                ) &&
                !(
                    field.title === "Река" &&
                    currentField.id === 3 &&
                    currentBoatStatus === "onLeft"
                ) &&
                !(
                    currentField.id === 2 &&
                    field.id === 1 &&
                    currentBoatStatus === "onRight"
                ) &&
                !(
                    currentField.id === 2 &&
                    field.id === 3 &&
                    currentBoatStatus === "onLeft"
                )
            ) {
                e.target.style.boxShadow = "0 0 10px 10px white inset";
            } else if (
                e.target.className.includes("Field") &&
                ((field.id - currentField.id) % 2 === 0 ||
                    (field.title === "Река" && field.items.length >= 1) ||
                    (field.title === "Река" &&
                        currentField.id === 1 &&
                        currentBoatStatus === "onRight") ||
                    (field.title === "Река" &&
                        currentField.id === 3 &&
                        currentBoatStatus === "onLeft") ||
                    (currentField.id === 2 &&
                        field.id === 1 &&
                        currentBoatStatus === "onRight") ||
                    (currentField.id === 2 &&
                        field.id === 3 &&
                        currentBoatStatus === "onLeft"))
            ) {
                e.target.style.boxShadow =
                    "0 0 20px 5px red inset, 0 0 20px 5px white inset";
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
        const currentIndex = currentField.items.indexOf(currentItem);
        const dropIndex = field.items.indexOf(item);

        if (currentField.id === field.id) {
            const newField = [...field.items];
            [newField[currentIndex], newField[dropIndex]] = [
                newField[dropIndex],
                newField[currentIndex],
            ];
            setFields(
                fields.map((f) => {
                    if (f.id === currentField.id) {
                        return { ...f, items: newField };
                    }
                    return f;
                })
            );
        }
    };

    const dropItemHandler = (e, field) => {
        e.target.style.boxShadow = "none";
        e.target.parentElement.style.boxShadow = "none";
        if (
            currentField.id !== field.id &&
            !(field.title === "Река" && field.items.length >= 1) &&
            !((field.id - currentField.id) % 2 === 0) &&
            !(
                field.title === "Река" &&
                currentField.id === 1 &&
                currentBoatStatus === "onRight"
            ) &&
            !(
                field.title === "Река" &&
                currentField.id === 3 &&
                currentBoatStatus === "onLeft"
            ) &&
            !(
                currentField.id === 2 &&
                field.id === 1 &&
                currentBoatStatus === "onRight"
            ) &&
            !(
                currentField.id === 2 &&
                field.id === 3 &&
                currentBoatStatus === "onLeft"
            )
        ) {
            const newFieldItems = [...field.items, currentItem];
            const newCurrentFieldItems = [...currentField.items];
            const currentIndex = newCurrentFieldItems.indexOf(currentItem);
            newCurrentFieldItems.splice(currentIndex, 1);

            console.log(newFieldItems);
            setFields(
                fields.map((f) => {
                    if (f.id === field.id) {
                        return { ...f, items: newFieldItems };
                    }
                    if (f.id === currentField.id) {
                        return { ...f, items: newCurrentFieldItems };
                    }
                    return f;
                })
            );
        }
    };
    return (
        <>
            <Toolbar />
            <Popups />
            <MainWrapper>
                <MoveButton
                    onClick={() => {
                        toggleBoatStatus();
                    }}
                >
                    Переправить
                </MoveButton>
                {fields.map((field) => (
                    <Field
                        onDragOver={(e) => dragOverHandler(e, field)}
                        onDrop={(e) => dropItemHandler(e, field)}
                        onDragLeave={(e) => dragLeaveHandler(e, field)}
                        title={field.title}
                        key={field.id}
                        className={`Field, ${currentBoatStatus}`}
                    >
                        {field.items.map((item) => (
                            <Item
                                draggable={true}
                                onDragStart={(e) =>
                                    dragStartHandler(e, field, item)
                                }
                                onDragOver={(e) => dragOverHandler(e, field)}
                                onDrop={(e) => dropHandler(e, field, item)}
                                title={item.title}
                                key={item.id}
                                className={`Item, ${currentBoatStatus}, ${field.title}`}
                            ></Item>
                        ))}
                    </Field>
                ))}
            </MainWrapper>
        </>
    );
};

export default Mainframe;
