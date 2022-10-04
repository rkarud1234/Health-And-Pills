import { InputLabel, MenuItem, Select } from "@mui/material";
import styled from "styled-components";

const SelectWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const StyledSelect = styled.select`
  outline: none;
  padding: 8px 20px;
  font-size: 16px;
  width: 80%;
`;
const times = [
  { id: 1, title: "주 1 ~ 2회" },
  { id: 2, title: "주 3 ~ 4회" },
  { id: 3, title: "주 5 ~ 6회" },
  { id: 4, title: "매일" },
];
const TimesOfExercise = ({ onChange, timesOfExercise }) => {
  return (
    <SelectWrapper>
      <Select
        style={{ minWidth: "200px" }}
        name={"timesOfExercise"}
        onChange={onChange}
        inputProps={{ "aria-label": "Without label" }}
        value={timesOfExercise}
      >
        {times.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {/* <StyledSelect onChange={onChange} name={"timesOfExercise"}>
        {times.map((option) => (
          <option
            key={option.id}
            value={option.id}
            defaultValue={timesOfExercise === option.value}
          >
            {option.title}
          </option>
        ))}
      </StyledSelect> */}
    </SelectWrapper>
  );
};

export default TimesOfExercise;
