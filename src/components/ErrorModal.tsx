'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface Props {
  isOpen: boolean;
  errorMessage: string;
  onClose: () => void;
}

export default function ErrorModal({ isOpen, errorMessage, onClose }: Props) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const el = document.getElementById('portal');
    if (el) setPortalRoot(el);
  }, []);

  if (!mounted || !portalRoot) return null;

  const handleBgClick = () => onClose();

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        ref={nodeRef}
        onClick={handleBgClick}
      >
        <div
          className="w-[400px] rounded bg-white p-6 shadow-lg"
          onClick={handleContentClick}
        >
          <h2 className="mb-4 text-xl font-semibold">API Error</h2>
          <p className="mb-4 text-red-600">
            {errorMessage || 'An unknown error occurred.'}
          </p>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            type="button"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </CSSTransition>,
    portalRoot,
  );
}
