import styled from "styled-components";

const TagDiv = styled.div`
  display: inline-block;
  width: fit-content;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 13px;
  border: solid 1px lightgray;
  padding: 8px 10px;
  border-radius: 40px;
  color: #383e41;
`;

const TagCard = ({ item }) => {
  return <TagDiv>{item}</TagDiv>;
};

export default TagCard;
