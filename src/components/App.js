import './App.css';
import Mainframe from './mainframe';
import styled from 'styled-components';

const App = () => {

  const Body = styled.div`
    background-color: #202020;
 
  `;

  return (
    <Body>
    <Mainframe/>
    </Body>
  );
}

export default App;
