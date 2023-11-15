import { useEscape } from '../../hooks/useEscape.js';
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  modalName,
  isOpen,
  onSubmit,
}) => {

  useEscape(onClose)

  return (
    <div className={`modal modal_type_${modalName}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} />
        <h3 className="modal__title">{title}</h3>
        <form className="form" onSubmit={onSubmit}>
          <fieldset className="modal__fieldset">
            {children}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
