import { createSelector } from 'reselect';

const selectSubNav = (state, props) => state.getIn(['subnavs', props.subnavKey], null);

const makeSelectSubnavVisible = (props) => createSelector(
  (state, props) => selectSubNav(state, props), 
  (subnavState) => subnavState === null ? false : subnavState.get('visible')
);

export {
  selectSubNav,
  makeSelectSubnavVisible,
};

