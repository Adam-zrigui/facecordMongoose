import React, {useRef, useEffect, useCallback} from "react";
import {Portal} from "react-portal";
import {BsXLg} from "react-icons/bs";

interface ModalProps {
  onModalClose: () => void;
  Content: JSX.Element;
}

const Modal: React.FC<ModalProps> = React.memo(({onModalClose, Content}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const clickListener = useCallback((event: MouseEvent) => {
    if (modalRef.current?.contains(event.target as Node)) {
      return;
    }

    onModalClose();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", clickListener);
    }, 100);

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, []);


  return (
    <Portal>
      <div ref={modalRef}>
        <header>
          <BsXLg onClick={onModalClose} />
        </header>
        {Content}
      </div>
    </Portal>
  );
});


export default Modal;