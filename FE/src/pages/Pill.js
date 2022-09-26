import { useSelector } from "react-redux";
import Footer from "../components/layouts/Footer";
import Carousel from "../components/carousel/Carousel";
import RecomPills from "./Pills/RecomPills";
import SearchPills from "./Pills/SearchPills";

import imgUrl from '../assets/togetherX.jpg'
import Lutein from '../assets/lutein.jpg'
import Omega3 from '../assets/omega3.jpg'
import Cmbzmulti from '../assets/cmbzmulti.jpg'
import styled from "styled-components";

const ScrollDiv = styled.div`
::-webkit-scrollbar {
  display: none;
} /* Chrome, Safari, Opera 환경*/
scrollbar-height: none; /* firefox 환경 */
overflow-y: scroll;
height : 92vh;
`

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

  const pills = [
    { id: 1, text: '루테인', rating: 4.5, url: Lutein },
    { id: 2, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 3, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
    { id: 4, text: '루테인', rating: 4.5, url: Lutein },
    { id: 5, text: '오메가3', rating: 4.7, url: Omega3 },
    { id: 6, text: '종합비타민', rating: 4.9, url: Cmbzmulti },
  ]

  return <ScrollDiv>
    <SearchPills />
    <Carousel images={images} />
    <RecomPills pills={pills} type='user' />
    <RecomPills pills={pills} type='age' />
    <Footer />
  </ScrollDiv>;
};

export default Pill;
