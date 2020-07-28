import {
  interactor,
  scoped,
  clickable,
  is,
} from '@bigtest/interactor';

@interactor class PluginModalInteractor {
}

@interactor class CreateRecordsWrapperInteractor {
  button = scoped('[data-test-add-inventory-records]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new PluginModalInteractor('[data-test-create-records-modal]');
}

export default CreateRecordsWrapperInteractor;
