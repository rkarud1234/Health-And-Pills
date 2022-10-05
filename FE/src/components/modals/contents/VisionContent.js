import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { SearchImg } from '../../../store/actions/search';


const VisionContent = ({setSearchWord, close}) => {

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

  let convertImage = ''
  if (croppedImage) {
    convertImage = croppedImage.replace(/^data:image\/(png|jpg);base64,/, "")
  }

  const requestHandler = () => {
    SearchImg(convertImage)
    .then(res=> {
        setSearchWord(res);
    })
    close();
  }


    return (
        <><input type="file" accept="image/*" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} />
      <Cropper
        style={{ height: 400, width: 400 }}
        src={inputImage}
        crop={onCrop}
        ref={cropperRef}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        autoCropArea={1}
        checkOrientation={false}
        zoomable={false}
      />
      <img width="100px" src={croppedImage} />
      <button onClick={requestHandler}>요청</button>

        </>
    );
}

export default VisionContent;