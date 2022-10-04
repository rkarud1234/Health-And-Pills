import HealthCard from "../../components/cards/HealthCard";
import styled from "styled-components";
import Carousel from "../../components/carousel/Carousel";
import imgUrl from "../../assets/togetherX.jpg";

const RecommendWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HealthRecommend = () => {

  const images = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
  ]

  return (
    <>
      <div>
        <Carousel images={images} />
      </div>
      <div>
        추천 1
      </div>
      <RecommendWrapper>
        <HealthCard />
        <HealthCard />
        <HealthCard />
      </RecommendWrapper>
      <div>
        추천 2
      </div>
      <RecommendWrapper>
        <HealthCard />
        <HealthCard />
        <HealthCard />
      </RecommendWrapper>
      <div>
        추천 3
      </div>
      <RecommendWrapper>
        <HealthCard />
        <HealthCard />
        <HealthCard />
      </RecommendWrapper>
    </>
  );
};

export default HealthRecommend;