import { useRef, useEffect } from "react";
import { useFormik } from 'formik'
import { useTranslation } from "react-i18next";
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import * as yup from 'yup'; 

import { validateChannels } from "../../validation/validation";

const AddChannelModal = ({handleAdd, show, updateShowAdd, channels}) => {
  const inputRef = useRef(null);
  const {t} = useTranslation()

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
      handleAdd({name: values.channel})
      formik.resetForm()
      updateShowAdd()
     },
   });
return (
    <Modal show={show} onHide={updateShowAdd}  className="fade" tabIndex="-1" >
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="h4">{t('modals.addTitle')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
           <FormControl 
              className="mb-2"
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
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
          </FormGroup>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-end">
          <button className="me-2 btn btn-primary btn-secondary" type="button" value="cancel" onClick={updateShowAdd}>
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