import { Box, Step, StepLabel, Stepper } from "@mui/material";
import styled from "styled-components";

const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & svg {
    color: #b1b2ff !important;
  }
`;

const steps = [1, 2, 3];
const stepCount = { first: 1, second: 3 };
const RequireStep = ({ type }) => {
  return (
    <StepWrapper>
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={type !== "intro" ? parseInt(stepCount[type]) : 0}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </StepWrapper>
  );
};

export default RequireStep;
