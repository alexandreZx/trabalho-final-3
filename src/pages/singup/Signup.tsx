import styled from "@emotion/styled";
import MatrixRain from "../../themes/matrix/MatrixRain";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogForm from "../../components/LogForm";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;



function Signup() {
  return (
    <Main>
      <LogForm mode="Signup"/>
    </Main>
  );
}
export default Signup;