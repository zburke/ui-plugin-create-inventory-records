import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';

import CreateRecordsForm from './CreateRecordsForm';
import {
  parseInstance,
  parseHolding,
} from './util';
import {
  useData,
  useCallout,
  useIsLoading,
} from './hooks';

const initialValues = {
  instance: {
    discoverySuppress: true,
    contributors: [],
  },
  holding: {},
};

const CreateRecordsWrapper = ({
  onCreate,
  mutator: {
    createInstanceRecord,
    createHoldingsRecord,
  },
}) => {
  const { identifierTypesByName } = useData();
  const callout = useCallout();
  const isLoading = useIsLoading();

  const handleSubmit = useCallback(async (formData) => {
    const { instance, holding } = formData;

    try {
      const instanceRecord = await createInstanceRecord.POST(parseInstance(instance, identifierTypesByName));
      await createHoldingsRecord.POST(parseHolding(holding, instanceRecord));

      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.success" />,
      });

      onCreate();
    } catch (error) {
      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.error" />,
        type: 'error',
      });
    }
  }, [
    onCreate,
    callout,
    createInstanceRecord,
    createHoldingsRecord,
    identifierTypesByName,
  ]);

  if (isLoading) return null;

  return (
    <CreateRecordsForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};

CreateRecordsWrapper.propTypes = {
  onCreate: PropTypes.func.isRequired,
  mutator: PropTypes.object.isRequired,
};

CreateRecordsWrapper.manifest = Object.freeze({
  createInstanceRecord: {
    type: 'okapi',
    throwErrors: false,
    path: 'inventory/instances',
    fetch: false,
  },
  createHoldingsRecord: {
    type: 'okapi',
    path: 'holdings-storage/holdings',
    throwErrors: false,
    fetch: false,
  },
});

export default stripesConnect(CreateRecordsWrapper);
