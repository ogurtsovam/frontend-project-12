import { useRef, useEffect } from "react";
import { useFormik } from 'formik'
import { useTranslation } from "react-i18next";
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import * as yup from 'yup'; 

import { validateChannels } from "../../validation/validation";
import { useGetChannelsQuery } from '../../api/channelsApi.js';
import { useRenameChannelMutation } from "../../api/channelsApi.js";

const RenameChannelModal = ({show, updateShowRename, channel}) => {
  const inputRef = useRef(null);
  const {t} = useTranslation()
  const { data: channels, isLoading: isGettingChannels } = useGetChannelsQuery()
  const [renameChannel, { error: renameChannelError, isLoading: isRenamingChannels}] = useRenameChannelMutation();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

   const formik = useFormik({
     initialValues: {
       channel: '',
     },
      validationSchema: yup.object({
      channel: validateChannels(channels, t),
    }),
     onSubmit: values => {
      renameChannel({
        id: channel.id,
        channel: { name: values.channel }
      });
      formik.resetForm()
      updateShowRename()
     },
   });
return (
    <Modal show={show} onHide={updateShowRename}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="h4">{t('modals.renameTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
           <FormControl
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="channel"
              name="channel"
              type="text"
              placeholder=''
              ref={inputRef}
              value={formik.values.channel}
              isInvalid={formik.touched.channel && !!formik.errors.channel}
              data-testid="input-body"
            />
            {formik.touched.channel && formik.errors.channel ? (
              <div className="text-danger mt-1">{formik.errors.channel}</div>
            ) : null}
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" type="button" value="cancel" onClick={updateShowRename}>
            {t('modals.cancel')}
          </button>
          <button className="btn btn-primary" type="submit" value="submit">
            {t('modals.send')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default RenameChannelModal;