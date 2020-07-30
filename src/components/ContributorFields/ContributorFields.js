import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  TextField,
  Select,
  RepeatableField,
  Row,
  Col,
} from '@folio/stripes/components';

import PrimaryToggleButton from '../PrimaryToggleButton';

const ContributorFields = props => {
  // const {
  //   contributorNameTypes,
  //   contributorTypes,
  // } = props;

  // const contributorNameTypeOptions = contributorNameTypes.map(it => ({
  //   label: it.name,
  //   value: it.id,
  // }));

  // const contributorTypeOptions = contributorTypes.map(it => ({
  //   label: it.name,
  //   value: it.id,
  // }));

  return (
    <FieldArray
      id="clickable-add-contributor"
      component={RepeatableField}
      name="contributors"
      legend={<FormattedMessage id="ui-plugin-create-inventory-records.contributors" />}
      addLabel={<FormattedMessage id="ui-plugin-create-inventory-records.addContributor" />}
      renderField={(field, index, fields) => (
        <Row>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.name" />}
              name={`contributors[${index}].name`}
              required
              component={TextField}
            />
          </Col>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.nameType" />}
              name={`contributors[${index}].nameType`}
              required
              component={Select}
            />
          </Col>
          <Col sm={4}>
            <Field
              fields={fields}
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.primary" />}
              name={`contributors[${index}].primary`}
              component={PrimaryToggleButton}
            />
          </Col>
        </Row>
      )}
    />
  );
};

ContributorFields.propTypes = {
  contributorNameTypes: PropTypes.arrayOf(PropTypes.object),
  contributorTypes: PropTypes.arrayOf(PropTypes.object),
};

export default ContributorFields;
