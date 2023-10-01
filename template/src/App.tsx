import "./App.css";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk"
import { BusinessCard } from "./components/BusinessCard";
import logo from "./assets/hack-ton-berfest.jpg"

const StyledApp = styled.div`
  background-color: #12172c;
  color: white;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Logo = styled.div`
  height: 48px;
`;
function App() {
  // const {network} = useTonConnect()

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>        
            <img src={logo} height={48} />
            {/*<TonConnectButton/>*/}
            <Button>
              N/A
            </Button>
          </FlexBoxRow>
          <BusinessCard />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
