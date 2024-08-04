import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'; // 스타일을 위한 파일

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

function CalendarModal({ isOpen, onClose, onSelectDate }: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      );
      setSelectedDate(localDate);
      onSelectDate(localDate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <button type="button" className="modal-overlay" onClick={onClose}>
      <button
        type="button"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          X
        </button>
        <DatePicker
          inline
          selected={selectedDate}
          onChange={handleDateChange}
        />
      </button>
    </button>
  );
}

export default CalendarModal;
