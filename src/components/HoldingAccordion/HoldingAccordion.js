
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Select,
  TextField,
} from '@folio/stripes/components';
import {
  LocationSelection,
  LocationLookup,
} from '@folio/stripes/smart-components';

import {
  useData,
  useOptions,
} from '../../hooks';

const HoldingAccordion = ({ change }) => {
  const { callNumberTypes } = useData();
  const callNumberTypeOptions = useOptions(callNumberTypes, 'id', 'name');

  const selectLocation = useCallback((name, loc) => {
    if (!loc) {
      change(`holding.${name}`, '');
      return;
    }

    change(`holding.${name}`, loc.id);
  }, [change]);

  return (
    <Accordion
      id="holding"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.holdingsRecord" />}
    >
      <Row>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectLocation">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.permanentLocation" />}
                placeholder={placeholder}
                name="holding.permanentLocationId"
                id="select_permanent_location"
                component={LocationSelection}
                fullWidth
                marginBottom0
                onSelect={loc => selectLocation('permanentLocationId', loc)}
                required
              />
            )}
          </FormattedMessage>
          <LocationLookup onLocationSelected={loc => selectLocation('permanentLocationId', loc)} />
        </Col>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectLocation">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.temporaryLocation" />}
                placeholder={placeholder}
                name="holding.temporaryLocationId"
                id="select_temporary_location"
                component={LocationSelection}
                fullWidth
                marginBottom0
                onSelect={loc => selectLocation('temporaryLocationId', loc)}
              />
            )}
          </FormattedMessage>
          <LocationLookup onLocationSelected={loc => selectLocation('temporaryLocationId', loc)} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectType">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberType" />}
                name="holding.callNumberTypeId"
                id="select_call_number_type"
                component={Select}
                placeholder={placeholder}
                dataOptions={callNumberTypeOptions}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberPrefix" />}
            name="holding.callNumberPrefix"
            id="call_number_prefix"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumber" />}
            name="holding.callNumber"
            id="call_number"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberSuffix" />}
            name="holding.callNumberSuffix"
            id="call_number_suffix"
            component={TextField}
            fullWidth
          />
        </Col>
      </Row>
    </Accordion>
  );
};

HoldingAccordion.propTypes = {
  change: PropTypes.func.isRequired,
};

export default HoldingAccordion;
