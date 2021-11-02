import { expect } from 'chai';
import { ListboxAction, ListboxState } from '.';
import defaultReducer from './defaultReducer';

describe('useListbox defaultReducer', () => {
  describe('action: setControlledValue', () => {
    it("assigns the provided value to the state's selectedValue", () => {
      const state: ListboxState<string> = {
        highlightedIndex: 42,
        selectedValue: null,
      };

      const action: ListboxAction<string> = { type: 'setControlledValue', value: 'foo' };
      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.equal('foo');
    });
  });

  describe('action: blur', () => {
    it('resets the highlightedIndex', () => {
      const state: ListboxState<string> = {
        highlightedIndex: 42,
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: 'blur',
        event: {} as any, // not relevant
        props: {
          options: [],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          isOptionEqualToValue: (o, v) => o === v,
          selectMultiple: false,
        },
      };

      const result = defaultReducer(state, action);
      expect(result.highlightedIndex).to.equal(-1);
    });
  });

  describe('action: optionClick', () => {
    it('sets the selectedValue to the clicked value', () => {
      const state: ListboxState<string> = {
        highlightedIndex: 42,
        selectedValue: null,
      };

      const action: ListboxAction<string> = {
        type: 'optionClick',
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          isOptionEqualToValue: (o, v) => o === v,
          selectMultiple: false,
        },
        option: 'two',
        optionIndex: 1,
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.equal('two');
    });

    it('add the clicked value to the selection if selectMultiple is set', () => {
      const state: ListboxState<string> = {
        highlightedIndex: 42,
        selectedValue: ['one'],
      };

      const action: ListboxAction<string> = {
        type: 'optionClick',
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          isOptionEqualToValue: (o, v) => o === v,
          selectMultiple: true,
        },
        option: 'two',
        optionIndex: 1,
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.deep.equal(['one', 'two']);
    });

    it('remove the clicked value from the selection if selectMultiple is set and it was selected already', () => {
      const state: ListboxState<string> = {
        highlightedIndex: 42,
        selectedValue: ['one', 'two'],
      };

      const action: ListboxAction<string> = {
        type: 'optionClick',
        event: {} as any, // not relevant
        props: {
          options: ['one', 'two', 'three'],
          disableListWrap: false,
          disabledItemsFocusable: false,
          isOptionDisabled: () => false,
          isOptionEqualToValue: (o, v) => o === v,
          selectMultiple: true,
        },
        option: 'two',
        optionIndex: 1,
      };

      const result = defaultReducer(state, action);
      expect(result.selectedValue).to.deep.equal(['one']);
    });
  });
});
