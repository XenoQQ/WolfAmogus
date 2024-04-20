import { useRecoilState, useSetRecoilState } from "recoil";
import { currentFieldStateAtom, currentCaseAtom, currentTimerAtom } from "../state/atoms";
import { caseParams } from "../params/caseParams";
import styled from "styled-components";

const Frame = styled.div`
    z-index: 9999;
    position: absolute;

    display: flex;

    width: 100%;
    height: 100vh;

    background: rgba(0, 0, 0, 0.5);
`;

const Popup = styled.div`
    position: absolute;
    left: calc(20% - 2vw);
    top: 26vh;

    display: flex;

    width: calc(60% - 0.7vw);
    height: 40vh;

    padding: 2vw;

    font-family: "Pacifico", cursive;
    font-size: 2.5vh;

    background-color: #32aefc;
    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    flex-direction: column;
    text-align: center;

    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
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

const Popups = () => {
    const [currentCase, setCurrentCase] = useRecoilState(currentCaseAtom);

    const setFieldsState = useSetRecoilState(currentFieldStateAtom);
    const setCurrentTimer = useSetRecoilState(currentTimerAtom);

    const paramsByCase = caseParams[currentCase];

    const handlePopupButtonClick = () => {
        if (currentCase === "onNewGame" || currentCase === "onRules") {
            setCurrentCase("onPlay");
        }

        if (currentCase === "onDefeat" || currentCase === "onSuccess") {
            setCurrentCase("onPlay");
            setFieldsState({
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
                boatCounter: 0,
            });
            setCurrentTimer(0)
        }
    };

    return (
        <>
            {paramsByCase.popupVisible && (
                <Frame>
                    <Popup>
                        <Title>{paramsByCase.popupTitle}</Title>
                        {paramsByCase.popupDescripton}
                        <Button onClick={handlePopupButtonClick}>{paramsByCase.popupButton}</Button>
                    </Popup>
                </Frame>
            )}
        </>
    );
};

export default Popups;
