// import React, { useState } from 'react';

import { useState } from 'react';
import { FridgeMode } from '../types/fridgeType';

type PopupModalProps = {
  onClose: () => void;
  mode: FridgeMode;
  onModeChange: (mode: FridgeMode) => void; // 모드 변경을 위한 콜백 추가
};

function PopupModal({ onClose, mode, onModeChange }: PopupModalProps) {
  const [message, setMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  switch (mode) {
    case 'add':
      setMessage('냉장고 추가합니다.');
      break;
    case 'edit':
      setMessage('냉장고 수정합니다.');
      break;
    case 'delete':
      setMessage('냉장고 삭제합니다.');
      break;
    default:
      break;
  }
  const handleModeButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    mode: FridgeMode,
  ) => {
    event.preventDefault();
    onModeChange(mode);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{message}</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleModeButton}
        >
          {submitMessage}
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
