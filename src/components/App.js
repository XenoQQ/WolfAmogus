import "./App.css";
import Mainframe from "./mainframe";
import { RecoilRoot } from "recoil";

const App = () => {
    return (
        <RecoilRoot>
            <Mainframe />
        </RecoilRoot>
    );
};

export default App;
