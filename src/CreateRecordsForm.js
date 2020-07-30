import React from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import { InstanceAccordion } from './components';

const initialStatus = {
  instance: true,
  holding: false,
  item: false,
};

const validate = () => {
  return true;
};

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
    instance: {},
    holding: {},
    item: {},
    contributors: [],
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
