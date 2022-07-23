import { useIsMobile } from 'hooks/useIsMobile';
import React, { useState, PropsWithChildren, useEffect } from 'react'

interface Props {
  isOpen: boolean;
  backgroundStyle?: string;
  onClose: () => void;
}


const Modal = (props: PropsWithChildren<Props>) => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // handle escape and click outside
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target ! instanceof Element && e.target.classList.contains('modal')) {
        props.onClose();
      }
    }
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    }
  }, [props]);
  
  
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="modal flex fixed items-center 
                    justify-center inset-0 z-50 
                    overflow-y-auto backdrop-blur">
      <div className={ `flex w-3/4 h-3/4
                      z-50 overflow-y-auto
                      border-2 bg-black/25 ` + ( props.backgroundStyle ) }>
        {props.children}
      </div>
    </div>
  )
}

export default Modal