import React from 'react'

const ImagePlaceholder = ({ handleChange, inputRef, mediaPreview, setMediaPreview, setMedia, user }) => {
    return (
        <div>
            <input style={{ display: "none" }}
                type='file'
                accept='image/*'
                onChange={handleChange}
                name='media'
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
                        <img src={user.profilePicture} onClick={() => inputRef.current.click()} />
                    </>
                ) : (
                    <>
                        <img src={mediaPreview} onClick={() => inputRef.current.click()} />
                    </>
                )}
            </div>
        </div>
    )
}

export default ImagePlaceholder