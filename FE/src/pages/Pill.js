import { useSelector } from "react-redux";
import Footer from "../components/layouts/Footer";
import Carousel from "../components/carousel/Carousel";
import imgUrl from '../assets/togetherX.jpg'
import RecomPills from "./Pills/RecomPills";
const Pill = () => {
  const user = useSelector((state) => state.user);
  const images = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
  ]
  return <>
    <Carousel images={images} />
    <RecomPills />
    {!user.isLogin ? <Footer /> : <></>}
  </>;
};

export default Pill;
