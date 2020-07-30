import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import { InstanceAccordion } from './components';
import { validateOptionalField } from './util';

const initialStatus = {
  instance: true,
  holding: false,
  item: false,
};

function validateInstance(instance = {}) {
  const errors = {};

  if (!instance.title) {
    errors.title = <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />;
  }

  if (!instance.instanceTypeId) {
    errors.instanceTypeId = <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />;
  }

  // the list itself is not required, but if a list is present,
  // each item must have non-empty values in each field.
  const optionalLists = [
    {
      list: 'contributors',
      textFields: ['name'],
      selectFields: ['contributorNameTypeId'],
    },
  ];

  optionalLists.forEach(listProps => {
    const listErrors = validateOptionalField(listProps, instance);
    if (listErrors.length) {
      errors[listProps.list] = listErrors;
    }
  });

  return errors;
}

function validate(values) {
  const instance = validateInstance(values.instance);

  return {
    instance,
  };
}

const CreateRecordsForm = ({ handleSubmit }) => {
  return (
    <form
      id="create-records-form"
      data-test-create-records-form
      onSubmit={handleSubmit}
    >
      <AccordionStatus>
        <Row end="xs">
          <Col data-test-expand-all xs>
            <ExpandAllButton />
          </Col>
        </Row>
        <AccordionSet initialStatus={initialStatus}>
          <InstanceAccordion />
        </AccordionSet>
      </AccordionStatus>
    </form>
  );
};

CreateRecordsForm.defaultProps = {
  initialValues: {
    instance: {
      contributors: [],
    },
    holding: {},
    item: {},
  },
};

CreateRecordsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object, // eslint-disable-line
};

export default stripesFinalForm({
  validate,
  navigationCheck: true,
})(CreateRecordsForm);
