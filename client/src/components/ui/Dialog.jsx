import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, onOpenChange })
      )}
    </>
  );
}

export function DialogTrigger({ children, onOpenChange }) {
  return <button onClick={() => onOpenChange(true)}>{children}</button>;
}

export function DialogContent({ children, open, onOpenChange }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => onOpenChange(false)} // close when clicking outside
    >
      <div
        className="bg-white rounded-2xl p-6 w-[400px] relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-gray-600 text-sm mt-1">{children}</p>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
