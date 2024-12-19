import React from 'react';
import { Transition } from '@headlessui/react';

interface PopupNotificationProps {
  message: string | null;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({ message }) => {
  return (
    <Transition
      show={!!message}
      enter="transition ease-out duration-300 transform"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="fixed top-24 right-0 border-l-8 border-l-green-500 bg-white text-green-500 px-4 py-2 rounded shadow-lg h-12 flex items-center">
        {message}
      </div>
    </Transition>
  );
};

export default PopupNotification;