import { useSelector } from "react-redux";
import Footer from "../components/layouts/Footer";
const Pill = () => {
  const user = useSelector((state) => state.user);
  return <>
    {!user.isLogin ? <Footer /> : <></>}
  </>;
};

export default Pill;
