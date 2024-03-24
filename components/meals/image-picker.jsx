'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  // we do not want to use default input file because not good style
  // we add button
  // the button should trigger the input file using useRef + onclick func
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    // input file defaultly give files array, can be used to receive more files when in input file we add 'multiple' property
    // here only can receive [0] = one file
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // convert into Data URL to preview
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt='The image selected by the user.'
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type='file'
          name={name}
          id={name}
          accept='image/png, image/jpeg'
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type='button'
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
