import { createPortal } from "react-dom";
import { MouseEvent } from "react";
import "./dialog.css";

interface Props {
  isOpen: boolean;
  title: string;
  buttonLabel: string;
  price: number;
  onClickButton: (e: MouseEvent) => void;
}

export default function Dialog({
  isOpen,
  title,
  buttonLabel,
  price,
  onClickButton,
}: Props) {
  if (!isOpen) {
    return null;
  }

  const portalEl = document.getElementById("portal");
  if (!portalEl) return null;

  return createPortal(
    <>
      <div className="overlay">
        <div className="modal">
          <span>{title}</span>
          <span>총 합계 가격: ${price}</span>
          <button onClick={onClickButton}>{buttonLabel}</button>
        </div>
      </div>
    </>,
    portalEl
  );
}
