import { useRef, useEffect } from "react";
import { useFormik } from 'formik'
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import * as yup from 'yup';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { validateChannels } from "../../validation/validation";
import { useGetChannelsQuery } from '../../api/channelsApi.js';
import { useRenameChannelMutation } from "../../api/channelsApi.js";
import { setActive } from "../../slices/activeChannelSlice";

const RenameChannelModal = ({show, updateShowRename, channel}) => {
  const inputRef = useRef(null);
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const { data: channels } = useGetChannelsQuery()
  const [renameChannel] = useRenameChannelMutation();

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
      onSubmit: async (values) => {
      try {
        if (leoProfanity.check(values.channel)) {
          toast.error(t('errors.badName'))
          return;
        }
        const newChannel = await renameChannel({
        id: channel.id,
        channel: { name: values.channel }
        }).unwrap();
        dispatch(setActive(newChannel));
        toast.success(t('toast.channelRenamed'));
        updateShowRename();
        formik.resetForm();
      } catch (err) {
        if (!err.response) {
          toast.error(t('errors.connectionError'));
        }
        toast.error(t('errors.renameChannelError'));
      }
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
            <label class="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
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