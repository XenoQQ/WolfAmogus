import styled from "styled-components";
import Ach from "../assets/ach.png";
import Question from "../assets/question.png";
import Reset from "../assets/reset.png";

const Bar = styled.div`
    position: absolute;

    display: flex;

    width: 100%;
    height: 8vh;

    background: none;

    align-items: center;
    justify-content: space-between;
`;

const GameTitle = styled.div`
    display: flex;

    width: calc(100% / 4 - 80px);
    height: 50px;

    margin: 40px 0 0 40px;

    font-family: "Pacifico", cursive;
    font-size: 25px;
    color: black;

    background-color: #32aefc;

    border: 5px solid #c98343;
    border-radius: 10px;

    align-items: center;
    justify-content: center;
`;

const ButtonSection = styled.div`
    display: flex;

    width: calc(100% / 4 - 80px);
    height: 60px;

    margin: 40px 40px 0 0;
`;

const AchButton = styled.button`
    width: 60px;
    height: 60px;

    background: no-repeat center/30px url(${Ach}), #c98343;

    margin: 0 60px 0 0;

    border-style: none;

    border-radius: 10px;

    cursor: pointer;
`;

const ResButton = styled.button`
    width: 60px;
    height: 60px;

    background: no-repeat center/30px url(${Reset}), #c98343;

    margin: 0 60px 0 0;

    border-style: none;

    border-radius: 10px;

    cursor: pointer;
`;

const RulButton = styled.button`
    width: 60px;
    height: 60px;

    background: no-repeat center/40px url(${Question}), #c98343;

    border-style: none;

    border-radius: 10px;

    cursor: pointer;
`;

const Toolbar = () => {
    //////////////////////////////////////////[States section]//////////////////////////////////////////

    //////////////////////////////////////////[Logic section]//////////////////////////////////////////

    //////////////////////////////////////////[Styles section]//////////////////////////////////////////

    return (
        <>
            <Bar>
                <GameTitle>Переправляющаяся братва</GameTitle>
                <ButtonSection>
                    <AchButton />
                    <ResButton />
                    <RulButton />
                </ButtonSection>
            </Bar>
        </>
    );
};

export default Toolbar;
