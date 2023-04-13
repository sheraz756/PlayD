import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const ImagePlaceholder = ({ handleChange, inputRef, mediaPreview, setMediaPreview, setMedia, name }) => {
    return (
        <div>
            <input style={{ display: "none" }}
                type='file'
                accept='image/*'
                onChange={handleChange}
                name={name}
                ref={inputRef}
            />
            <div
                onDrop={(e) => {
                    e.preventDefault();
                    const dropedFile = Array.from(e.dataTransfer.files);
                    setMedia(dropedFile[0]);
                    setMediaPreview(URL.createObjectURL(dropedFile[0]));
                }}
            >
                {mediaPreview === null ? (
                    <>
                        <div style={{
                            height: '150px',
                            width: '150px',
                            objectFit: 'cover',
                            border: '3px solid green',
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor:'pointer'
                        }}
                            onClick={() => inputRef.current.click()}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>
                    </>
                ) : (
                    <>
                        <img style={{
                            height: '150px',
                            width: '150px',
                            objectFit: 'cover',
                            border: '3px solid green',
                            cursor:'pointer'
                        }} src={mediaPreview} onClick={() => inputRef.current.click()} />
                    </>
                )}
            </div>
        </div>
    )
}

export default ImagePlaceholder