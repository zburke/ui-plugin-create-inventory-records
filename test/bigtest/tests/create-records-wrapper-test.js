import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import CreateRecordsWrapperInteractor from '../interactors/createRecordsWrapper';

const recordsWrapper = new CreateRecordsWrapperInteractor();

describe('CreateInventoryRecords', function () {
  setupApplication();

  describe('rendering', function () {
    it('renders button', function () {
      expect(
        recordsWrapper.button.isPresent
      ).to.be.true;
    });

    describe('click the button', function () {
      beforeEach(async function () {
        await recordsWrapper.button.click();
      });

      it('opens a modal', function () {
        expect(recordsWrapper.modal.isPresent).to.be.true;
      });
    });
  });
});
