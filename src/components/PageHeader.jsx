import React, { useState } from "react";

export default function PageHeader({ title, subtitle, buttonText, ModalComponent }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 border-b border-[#DCDCDC] flex items-center justify-between bg-white rounded-t-xl">
      <div>
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
        <p className="text-md text-gray-500">{subtitle}</p>
      </div>

      {buttonText && ModalComponent && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#3893D0] hover:bg-[#2c7cb5] text-white rounded-xl px-4 py-1 transition-all"
          >
            + {buttonText}
          </button>

          {showModal && <ModalComponent onClose={() => setShowModal(false)} />}
        </>
      )}
    </div>
  );
}
