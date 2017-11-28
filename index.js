import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import withClickOutsideListener from 'react-onclickoutside';
import { createStructuredSelector } from 'reselect';
import NavItem from 'components/Navigation/NavItem';
import SubNav from 'components/Navigation/SubNav';
import SubNavItem from 'components/Navigation/SubNavItem';
import { makeSelectSubnavVisible } from './selectors';
import { closeSubnav, toggleSubnav } from './actions';
import reducer from './reducer';

export class SubNavLinkContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleClickOutside(event) {
    this.props.onClose(event);
  }

  renderSubNav(subnav, visible, subnavKey) {
    return (
      <SubNav visible={visible}>
        {this.renderSubNavItems(subnav, subnavKey)}
      </SubNav>
    );
  }

  renderSubNavItems(subnav, subnavKey) {
    return subnav.map((item) =>
      <SubNavItem key={`${subnavKey}_subitem_${item.link}`} onClick={this.props.onClose}><Link to={item.link} >{item.title}</Link></SubNavItem>
    );
  }

  render() {
    return (
      <NavItem>
        <a onClick={(evt) => this.props.onClick(evt, this.props.visible)} role="menuitem" tabIndex={this.props.tabIndex}>{this.props.children}</a>
        {this.renderSubNav(this.props.subnav, this.props.visible, this.props.subnavKey)}
      </NavItem>
    );
  }


}

SubNavLinkContainer.defaultProps = {
  subnav: [],
  tabIndex: 1,
};

SubNavLinkContainer.propTypes = {
  subnav: PropTypes.array,
  visible: PropTypes.bool,
  subnavKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  tabIndex: PropTypes.number,
  children: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  visible: makeSelectSubnavVisible(ownProps),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (evt, visible) => { evt.preventDefault(); return dispatch(toggleSubnav(visible, ownProps.subnavKey)); },
  onClose: (evt) => dispatch(closeSubnav(evt, ownProps.subnavKey)),
});

const withReducer = injectReducer({ key: 'subnavs', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withConnect,
  withClickOutsideListener,
)(SubNavLinkContainer);
