import Carousel from "../../components/carousel/Carousel";
import imgUrl1 from "../../assets/carousel/health/001.jpg";
import imgUrl2 from "../../assets/carousel/health/002.jpg";
import imgUrl3 from "../../assets/carousel/health/003.jpg";
import imgUrl4 from "../../assets/carousel/health/004.jpg";
import imgUrl5 from "../../assets/carousel/health/005.jpg";
import RecommendWrapper from "./RecommenWrapper";


const HealthRecommend = ({
  bestExercises,
  customExercises,
  userExercises,
  ageGroup,
  gender,
  user
}) => {
  const images = [
    { id: 1, url: imgUrl1 },
    { id: 2, url: imgUrl2 },
    { id: 3, url: imgUrl3 },
    { id: 4, url: imgUrl4 },
    { id: 5, url: imgUrl5 },
  ]

  return (
    <>
      <div>
        <Carousel images={images} />
      </div>
      <RecommendWrapper exercises={bestExercises} text='베스트 10 운동 추천' />
      <RecommendWrapper exercises={customExercises} text={user + '님을 위한 맞춤 운동 추천'} />
      <RecommendWrapper exercises={userExercises} text={ageGroup + ' ' + gender + '이 자주하는 운동'} />
    </>
  );
};

export default HealthRecommend;