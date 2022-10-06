import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { SearchImg } from "../../../store/actions/search";
import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;
const TextDiv = styled.div`
  text-align: center;
  margin: 0px 8px;
  width: 100%;
  background: linear-gradient(180deg, #537cfe 0%, #6a53fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  padding: 2px 0px;
`;
const CustomBtn = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border: solid 2px;
  border-radius: 30px;
  margin: 8px;
  &.search {
  background: linear-gradient(180deg, #537CFE 0%, #6A53FE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: 1px solid #537cfe;
  &.cancel {
  background-image: linear-gradient(#fff, #fff);
  border-radius: 30px;
  border: 1px solid #6d6d6d;
  color: #6d6d6d;
  :hover{
    border-color: black;
    color:black;
  }
  `;
const VisionContent = ({ setSearchWord, close }) => {
  const cropperRef = useRef(null);
  // 유저가 첨부한 이미지
  const [inputImage, setInputImage] = useState(null);
  // 유저가 선택한 영역만큼 크롭된 이미지
  const [croppedImage, setCroppedImage] = useState(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  let convertImage = "";
  if (croppedImage) {
    convertImage = croppedImage.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  const requestHandler = () => {
    SearchImg(convertImage).then((res) => {
      setSearchWord(res);
    });
    close();
  };

  return (
    <div>
      <TextDiv style={{ fontSize: "24px", color: "black" }}>
        사진으로 검색
      </TextDiv>
      <TextDiv style={{ fontSize: "12px", marginBottom: "6px" }}>
        주변에 있는 영양제를 찍어 검색해보세요!
      </TextDiv>
      <div>
        <input
          hidden
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) =>
            setInputImage(URL.createObjectURL(e.target.files[0]))
          }
        />
        <label htmlFor="file">
          <div
            style={{
              display: "flex",
              padding: "16px 0px",
              border: "1px solid #c1c1c1",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              color: "#777777",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-image fa-lg"></i>
            <div
              style={{
                padding: "7px 4px 4px 4px",
              }}
            >
              사진 첨부
            </div>
          </div>
        </label>
      </div>
      <Cropper
        style={{
          height: "100%",
          width: "100%",
          maxWidth: "360px",
          maxHeight: "360px",
        }}
        src={inputImage}
        crop={onCrop}
        ref={cropperRef}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        autoCropArea={1}
        checkOrientation={false}
        zoomable={false}
        className="cropper"
      />
      <FlexDiv>
        <div>
          <img width="200px" height="100px" src={croppedImage} />
        </div>
        <FlexDiv
          style={{ flexDirection: "column", justifyContent: "flex-end" }}
        >
          <TextDiv>필요한 부분을 자른 후</TextDiv>
          <TextDiv>검색 버튼 클릭</TextDiv>
          <CustomBtn onClick={requestHandler} className="search">
            검색
          </CustomBtn>
        </FlexDiv>
      </FlexDiv>
    </div>
  );
};

export default VisionContent;
