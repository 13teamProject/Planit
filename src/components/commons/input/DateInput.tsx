'use client';

import '@/styles/custom-datepicker.css';
import classNames from 'classnames';
import Image from 'next/image';
import React, { forwardRef, memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller } from 'react-hook-form';

type DateInputWrapperProps = {
  size: 'md' | 'lg';
  control: Control;
  placeholder: string;
  name: string;
};

export default function DateInputWrapper({
  name,
  placeholder,
  size,
  control,
}: DateInputWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <DateInput size={size} placeholder={placeholder} onChange={onChange} />
      )}
    />
  );
}

type DateInputProps = {
  size: 'md' | 'lg';
  placeholder: string;
  onChange: (value: Date) => void;
};

const DateInput = memo(({ size, placeholder, onChange }: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const now = new Date();
  const isToday =
    selectedDate && selectedDate.toDateString() === now.toDateString();

  const handleChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    onChange(date);
  };

  const wrapperClassnames = classNames('block w-full', {
    'h-42': size === 'md',
    'h-48': size === 'lg',
  });

  return (
    <div className={wrapperClassnames}>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        minDate={now}
        minTime={
          isToday
            ? now
            : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)
        }
        maxTime={
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59)
        }
        dateFormat="yyyy.MM.dd HH:mm"
        showTimeSelect
        customInput={
          <CustomInput
            placeholderText={placeholder}
            onClick={() => {}}
            value={String(selectedDate)}
          />
        }
      />
    </div>
  );
});

DateInput.displayName = 'DateInputWrapper';

type CustomInputProps = {
  value: string;
  placeholderText: string;
  onClick: () => void;
};

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholderText }, ref) => {
    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="block size-full rounded-md border border-gray-200 bg-white"
      >
        <div className="flex items-center justify-start gap-10 px-16">
          <Image
            src={value ? '/icon/calendar.svg' : '/icon/calendar_gray.svg'}
            alt="calendar"
            width={22}
            height={22}
          />
          {value ? (
            <span className="text-black-800">{value}</span>
          ) : (
            <span className="text-gray-300">{placeholderText}</span>
          )}
        </div>
      </button>
    );
  },
);

CustomInput.displayName = 'CustomInput';
