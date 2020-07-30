import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { keyBy } from 'lodash';

const dataManifest = {
  contributorNameTypes: {
    type: 'okapi',
    records: 'contributorNameTypes',
    path: 'contributor-name-types?limit=1000&query=cql.allRecords=1 sortby ordering',
  },
  instanceTypes: {
    type: 'okapi',
    records: 'instanceTypes',
    path: 'instance-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
};

// HOC used to reuse data dictionaries
const withData = WrappedComponent => {
  const WithDataComponent = (props) => {
    const { resources } = props;

    const isLoading = useCallback(() => {
      for (const key in dataManifest) {
        if (dataManifest[key].type === 'okapi' &&
          !(resources[key] && resources[key].hasLoaded)) {
          return true;
        }
      }

      return false;
    }, [resources]);

    const getData = useCallback(() => {
      const data = {};

      for (const key in dataManifest) {
        if (dataManifest[key].type === 'okapi') {
          data[key] = resources?.[key]?.records ?? [];
        }
      }

      return data;
    }, [resources]);

    return (<WrappedComponent
      getData={getData}
      isLoading={isLoading}
      {...props}
    />);
  };

  WithDataComponent.manifest = Object.freeze({ ...dataManifest, ...WrappedComponent.manifest });

  WithDataComponent.propTypes = {
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.object.isRequired,
  };

  return WithDataComponent;
};


export default withData;
