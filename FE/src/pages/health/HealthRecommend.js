import HealthCard from "../components/cards/HealthCard";
import styled from "styled-components";

const RecommendWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HealthRecommend = () => {
  return (
    <>
      <div>
        carousel 들어올 div
      </div>
      <div>
          추천 1
      </div>
      <RecommendWrapper>
        <HealthCard/>
        <HealthCard/>
        <HealthCard/>
      </RecommendWrapper>
      <div>
        추천 2
      </div>
      <RecommendWrapper>
        <HealthCard/>
        <HealthCard/>
        <HealthCard/>
      </RecommendWrapper>
      <div>
        추천 3
      </div>
      <RecommendWrapper>
        <HealthCard/>
        <HealthCard/>
        <HealthCard/>
      </RecommendWrapper>
    </>
  );
};

export default HealthRecommend;