import styled from "styled-components";
import Ach from "../assets/ach.png";
import Question from "../assets/question.png";
import Reset from "../assets/reset.png";
import { useSetRecoilState } from "recoil";
import { currentMainframeState } from "../state/atoms";

//////////////////////////////////////////[Styles section]//////////////////////////////////////////

const Bar = styled.div`
    position: absolute;

    display: flex;

    width: 100%;
    height: 8vh;
    margin: calc(2.5% - 0.35vw) 0 0 0;

    background: none;

    align-items: center;
    justify-content: space-between;
`;

const GameTitle = styled.div`
    display: flex;

    width: calc(100% / 4 - 5%);
    height: 7vh;

    margin: 0 0 0 calc(2.5% - 0.35vw);

    font-family: "Pacifico", cursive;
    font-size: 3.4vh;
    color: black;

    background-color: #32aefc;

    border: 0.35vw solid #c98343;
    border-radius: 0.7vw;

    align-items: center;
    justify-content: center;

    z-index: 100;
`;

const ButtonSection = styled.div`
    display: flex;

    width: calc(100% / 4 - 5%);
    height: 8.4vh;

    margin: 0 calc(2.5% - 0.35vw) 0 0;

    z-index: 100;

    justify-content: space-between;
`;

const Button = styled.button`
    height: 8.4vh;
    aspect-ratio: 1/1;

    background: ${(props) =>
        props.className.includes("achievements")
            ? `no-repeat center/50% url(${Ach}), #c98343`
            : props.className.includes("restart")
            ? `no-repeat center/50% url(${Reset}), #c98343`
            : `no-repeat center/70% url(${Question}), #c98343`};

    border-style: none;

    border-radius: 1vh;

    cursor: pointer;
`;

const Toolbar = ({ handleReset }) => {
    //////////////////////////////////////////[States section]//////////////////////////////////////////

    const setMainframeState = useSetRecoilState(currentMainframeState);

    //////////////////////////////////////////[Logic section]//////////////////////////////////////////

    const handleRules = () => {
        setMainframeState("onRules");
    };

    return (
        <>
            <Bar>
                <GameTitle>Переправляющаяся братва</GameTitle>
                <ButtonSection>
                    <Button className="achievements" />
                    <Button className="restart" onClick={handleReset} />
                    <Button className="rules" onClick={handleRules} />
                </ButtonSection>
            </Bar>
        </>
    );
};

export default Toolbar;
