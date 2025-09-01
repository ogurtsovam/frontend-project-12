import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, FormGroup, FormControl } from 'react-bootstrap'

import { useRemoveChannelMutation } from "../../api/channelsApi.js";

const DeleteChannelModal = ({ show, updateShowRemove, channel}) => {
  const inputRef = useRef(null);
  const {t} = useTranslation()

  const [removeChannel, { error: removeChannelError, isLoading: isRemovingChannels}] = useRemoveChannelMutation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const handleSubmit = () => {
    removeChannel(channel.id)
    updateShowRemove()
  }
return (
    <Modal show={show} onHide={updateShowRemove}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="h4">{t('modals.deleteTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormGroup>
          <p className="lead">{t('modals.confirmation')}</p>
        </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="button" value="cancel" onClick={updateShowRemove}>
            {t('modals.cancel')}
          </button>
          <button className="btn btn-primary" type="submit" value="submit">
            {t('modals.delete')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default DeleteChannelModal;