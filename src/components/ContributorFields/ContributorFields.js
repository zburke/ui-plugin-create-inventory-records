import React from 'react';
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
import {
  useData,
  useOptions,
} from '../../hooks';

const ContributorFields = () => {
  const { contributorNameTypes } = useData();
  const contributorNameTypeOptions = useOptions(contributorNameTypes, 'id', 'name');

  return (
    <FieldArray
      id="clickable-add-contributor"
      component={RepeatableField}
      name="contributors"
      legend={<FormattedMessage id="ui-plugin-create-inventory-records.contributors" />}
      addLabel={<FormattedMessage id="ui-plugin-create-inventory-records.addContributor" />}
      renderField={(_, index, fields) => (
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
            <FormattedMessage id="ui-plugin-create-inventory-records.contributors.selectType">
              {placeholder => <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.nameType" />}
                name={`contributors[${index}].nameType`}
                required
                placeholder={placeholder}
                component={Select}
                dataOptions={contributorNameTypeOptions}
              />
              }
            </FormattedMessage>
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

export default ContributorFields;