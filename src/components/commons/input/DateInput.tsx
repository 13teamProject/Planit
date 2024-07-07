'use client';

import '@/styles/custom-datepicker.css';
import Image from 'next/image';
import React, { forwardRef, memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type DateInputWrapperProps<T extends FieldValues> = {
  control: Control<T>;
  placeholder: string;
  name: Path<T>;
  defaultValue?: T[Path<T>];
};

/**
 * DateInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * DateInput 컴포넌트를 렌더링합니다.
 */
export default function DateInputWrapper<T extends FieldValues>({
  name,
  placeholder,
  control,
  defaultValue,
}: DateInputWrapperProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <DateInput
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    />
  );
}

type DateInputProps = {
  placeholder: string;
  onChange: (value: Date) => void;
  defaultValue?: Date;
};

const DateInput = memo(
  ({ placeholder, onChange, defaultValue }: DateInputProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      defaultValue || null,
    );
    const now = new Date();
    const isToday =
      selectedDate && selectedDate.toDateString() === now.toDateString();

    const handleChange = (date: Date | null) => {
      if (!date) return;
      setSelectedDate(date);
      onChange(date);
    };

    return (
      <div className="block h-42 w-full text-14 dark:text-white md:h-48 md:text-16">
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
              value={selectedDate && String(selectedDate)}
            />
          }
        />
      </div>
    );
  },
);

DateInput.displayName = 'DateInputWrapper';

type CustomInputProps = {
  value: string | null;
  placeholderText: string;
  onClick: () => void;
};

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick, placeholderText }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="block size-full rounded-md border border-gray-200 bg-white focus:border-[1.5px] focus:border-toss-blue dark:bg-gray-700 dark:text-white"
    >
      <div className="flex items-center justify-start gap-10 px-16 dark:text-white">
        <Image
          src={value ? '/icon/calendar.svg' : '/icon/calendar_gray.svg'}
          alt="calendar"
          width={22}
          height={22}
        />
        {value ? (
          <span className="text-black-800 dark:text-white">{value}</span>
        ) : (
          <span className="text-gray-300 dark:text-white">
            {placeholderText}
          </span>
        )}
      </div>
    </button>
  ),
);

CustomInput.displayName = 'CustomInput';
