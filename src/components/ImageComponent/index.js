import React from 'react';

const ImageComponent = (props) => {
    return(
        <center>
            <img
                src={props.src}
                width={props.width}
                height={props.height}
                style={props.style}
                alt="file"
            />
        </center>
    );
};

export default ImageComponent;
