import { useRef, useState } from 'react';
import { ActionType } from '../types/actionType';
import ImageDrag from './ImageDrag';
import ImageResize from './ImageResize';
import ImageOutline from './ImageOutline';
import ImageMenu from './ImageMenu';
import { UploadedImage } from '../types/imageTypes';

interface ImageSelectProps {
  image: UploadedImage;
  selectedAction: ActionType;
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export default function ImageSelect({
  image,
  selectedAction,
  setImages,
}: ImageSelectProps) {
  // the scale of the div encapsulating the image
  // ref is necessary for accessing not stale state in event listeners
  const [scale, _setScale] = useState(1);
  const scaleRef = useRef(scale);
  const setScale = (scale: number) => {
    scaleRef.current = scale;
    _setScale(scale);
  };
  // when true don't drag the image
  const [isResizing, _setIsResizing] = useState(false);
  const isResizingRef = useRef(isResizing);
  const setIsResizing = (isResizing: boolean) => {
    isResizingRef.current = isResizing;
    _setIsResizing(isResizing);
  };

  return (
    <ImageDrag
      scaleRef={scaleRef}
      scale={scale}
      selectedAction={selectedAction}
      isResizingRef={isResizingRef}
    >
      <ImageOutline>
        <ImageMenu image={image} setImages={setImages} />
        <ImageResize
          setIsResizing={setIsResizing}
          setScale={setScale}
          scaleRef={scaleRef}
          selectedAction={selectedAction}
        />
        <img
          style={{ display: 'block' }}
          src={image.element.src}
          draggable={false}
        />
      </ImageOutline>
    </ImageDrag>
  );
}
