import React, { useState, useRef } from 'react';
import { Tooltip } from 'antd';
// import { Upload, message } from 'antd';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import '../../assets/css/styles.css';

/*function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const ImageUpload = () => {

    const [state, setState] = useState({loading:false});
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    const { loading, imageUrl } = state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return(
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
};

export default ImageUpload;*/

const UploadAnImage = (props) => {
  const hiddenFileInput = useRef(null);

  //initializing the imageFile to have the default image of UISSLOGO
  const [Image, setImage] = useState({ imageFile: props.defaultImage });
  console.log(Image)

  //method to handle an image when clicked to allow it to access file system
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  }

  const handleImageChange = (event) => {
    setImage({ imageFile: URL.createObjectURL(event.target.files[0]) });
  }

  console.log(handleImageChange)

  //method to handle when an image is changed, and the image uploaded to be the value of the input file from the URL

  return (
    <center>
      <Tooltip title="Click to change the image" color="gold">
        <img
          src={props.image}
          alt="Click here to upload"
          className="upload_an_image"
          id="upload_image"
          onClick={handleImageClick}
          style={props.style}

        />
      </Tooltip>
      <input
        type="file"
        onChange={props.handler}
        ref={hiddenFileInput}
        accept="image/*"
        style={{ display: "none" }}
      />
    </center>
  );
};

export default UploadAnImage;