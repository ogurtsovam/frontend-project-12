import { useTranslation } from 'react-i18next'
import { Modal, FormGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { useRemoveChannelMutation } from '../../api/channelsApi.js'

const DeleteChannelModal = ({ show, updateShowRemove, channel }) => {
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await removeChannel(channel.id).unwrap()
      toast.success(t('toast.channelRemoved'))
      updateShowRemove()
    }
    catch (err) {
      if (!err.response) {
        toast.error(t('errors.connectionError'))
      }
      else {
        toast.error(t('errors.removeChannelError'))
      }
    }
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
          <button className="btn btn-danger" type="submit" value="submit">
            {t('modals.delete')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default DeleteChannelModal
