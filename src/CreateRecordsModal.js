import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  CalloutContext,
  stripesConnect,
} from '@folio/stripes/core';
import { Modal } from '@folio/stripes/components';

const CreateRecordsModal = ({
  onClose,
}) => {
  const callout = useContext(CalloutContext);

  return (
    <Modal
      dismissible
      label={<FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />}
      onClose={onClose}
      open
      size="large"
      id="create-records-modal"
      data-test-create-records-modal
    >
      <div />
    </Modal>
  );
};

CreateRecordsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default stripesConnect(CreateRecordsModal);
