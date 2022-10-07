import { useState } from "react";
import GradationButton from "../../components/buttons/GradationButton";
import ModalCloseButton from "../../components/buttons/ModalCloseButton";
import SocialLoginContent from "../../components/modals/contents/SocialLoginContent";
import Modal from "../../components/modals/Modal";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";
const Landing = () => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <Modal
        isOpen={modalState}
        modalContent={<SocialLoginContent />}
        closeButton={<ModalCloseButton onClick={closeModal} />}
        close={closeModal}
        width={"270px"}
        height={"345px"}
      />
      <GradationButton
        status={"landing"}
        text={"간단가입하고 시작하기"}
        width={"70%"}
        fontSize={"18px"}
        padding={"10px 20px 10px 20px"}
        onClick={openModal}
      />
    </>
  );
};

export default Landing;
