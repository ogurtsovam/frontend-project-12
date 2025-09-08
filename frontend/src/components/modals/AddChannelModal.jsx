import { useRef, useEffect } from "react";
import { useFormik } from 'formik'
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import * as yup from 'yup'; 
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { validateChannels } from "../../validation/validation";
import { setActive } from "../../slices/activeChannelSlice";

const AddChannelModal = ({handleAdd, show, updateShowAdd, channels}) => {
  const inputRef = useRef(null); 
  const {t} = useTranslation() 
  const dispatch = useDispatch()
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
    onSubmit: async ( values) => { 
      try {
        if (leoProfanity.check(values.channel)) {
          toast.error(t('errors.badName'))
          return;
        }
        const newChannel = await handleAdd({ name: values.channel }).unwrap();
        dispatch(setActive(newChannel));
        toast.success(t('toast.channelCreated'))
        updateShowAdd();
        formik.resetForm(); 
      } catch (err) {
        if (!err.response) {
          toast.error(t('errors.connectionError'));
        }
        toast.error(t('errors.addChannelError'));
      }
    },
  });
return (
    <Modal show={show} onHide={updateShowAdd}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="h4">{t('modals.addTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <label class="visually-hidden" htmlFor="channel">{t('modals.channelName')}</label>
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
          <button className="btn btn-primary" type="button" value="cancel" onClick={updateShowAdd}>
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

export default AddChannelModal;