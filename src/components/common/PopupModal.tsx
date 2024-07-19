import React, { useState } from 'react';

type Props = {
  onClose: () => void;
  // mode: 'isAdd' | 'isEdit' | 'isDelete' | undefined;
};

function PopupModal({ onClose }: Props) {
  const [choiceMode, setChoiceMode] = useState('');
  const [isPopup, setIsPopup] = useState(true);

  switch (choiceMode) {
    case 'isAdd':
      alert('냉장고 추가합니다.');
      // setChoiceMode(false);
      setIsPopup(false);
      break;
    case 'isEdit':
      alert('냉장고 수정합니다.');
      // setChoiceMode(undefined);
      setIsPopup(false);
      break;
    case 'isDelete':
      alert('냉장고 삭제합니다.');
      // setChoiceMode(undefined);
      setIsPopup(false);
      break;
    default:
      return undefined;
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">냉장고 추가</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
