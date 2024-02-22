import Playfield from "./playfield";
import Toolbar from "./toolbar";
import Popups from "./popups";
import Achievements from "./achievements";

const Mainframe = () => {
    return (
        <>
            <Toolbar />
            <Popups />
            <Achievements />
            <Playfield />
        </>
    );
};

export default Mainframe;
