import { Button } from '../Button/Button';
import './Modal.css';

export const Modal = ({ isModalOpen, onClose, children }) => {
    console.log(isModalOpen)
    if (isModalOpen !== true) {
      return null;
    }
    return (
      <section className="modal">
        <article className="modal-content p-lg-4">
          <div className="exit-icon text-end">
            <Button 
                type="button" 
                name="open_modal" 
                onClick={onClose}>
                    X
            </Button>
          </div>
          {children}
        </article>
      </section>
    );
   };