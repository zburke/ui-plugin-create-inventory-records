import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  CalloutContext,
  stripesConnect,
} from '@folio/stripes/core';
import {
  Modal,
  ModalFooter,
  Button,
} from '@folio/stripes/components';

import CreateRecordsForm from './CreateRecordsForm';
import withData from './withData';
import { DataContext } from './contexts';

const CreateRecordsModal = ({
  onClose,
  isLoading,
  getData,
}) => {
  const callout = useContext(CalloutContext);
  const handleSubmit = useCallback(() => {
    // TODO: save the record
    const message = <FormattedMessage id="ui-plugin-create-inventory-records.success.onSave" />;
    callout.sendCallout({ message });
    onClose();
  }, [onClose, callout]);

  if (isLoading()) return null;

  const data = getData();

  const footer = (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        onClick={() => {
          // trigger submit outside of the form
          // https://final-form.org/docs/react-final-form/faq
          document
            .getElementById('create-records-form')
            .dispatchEvent(new Event('submit', { cancelable: true }));
        }}
      >
        <FormattedMessage id="ui-plugin-create-inventory-records.saveAndClose" />
      </Button>
      <Button onClick={onClose}>
        <FormattedMessage id="ui-plugin-create-inventory-records.cancel" />
      </Button>
    </ModalFooter>
  );

  return (
    <Modal
      id="create-records-modal"
      data-test-create-records-modal
      dismissible
      label={<FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />}
      onClose={onClose}
      footer={footer}
      open
      size="large"
    >
      <DataContext.Provider value={data}>
        <CreateRecordsForm onSubmit={handleSubmit} />
      </DataContext.Provider>
    </Modal>
  );
};

CreateRecordsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default stripesConnect(withData(CreateRecordsModal));
