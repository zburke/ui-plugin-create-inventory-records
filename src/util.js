import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * Provide validation of an optional form field consisting of one or more
 * textfields and one or more select fields used for type id selection,
 * where both parts (text and identifier type) are required.
 *
 * @param optionalField the field description object, consisting of
 *  list: list name (string)
 *  textFields: array of text field names
 *  selectFields: array of select field names
 * @param values array of field values passed in to caller validate function
 *
 * @return nested array of errors for optionalField
 */
export const validateOptionalField = (optionalField, values) => {
  const listName = optionalField.list;
  const errorList = [];

  if (values?.[listName]?.length) {
    values[listName].forEach((item, i) => {
      const entryErrors = {};

      optionalField.textFields.forEach((field) => {
        if (!item?.[field]) {
          entryErrors[field] = <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />;
          errorList[i] = entryErrors;
        }
      });

      optionalField.selectFields.forEach((field) => {
        if (!item?.[field]) {
          entryErrors[field] = <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />;
          errorList[i] = entryErrors;
        }
      });
    });
  }

  return errorList;
};

export default {};
