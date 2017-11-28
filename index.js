import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSubnavVisible } from './selectors';
import { closeSubnav, toggleSubnav } from './actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import withClickOutsideListener from 'react-onclickoutside';
import reducer from './reducer';
import NavItem from 'components/Navigation/NavItem';
import SubNav from 'components/Navigation/SubNav';
import SubNavItem from 'components/Navigation/SubNavItem';
export class SubNavLinkContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {   
    return (
      <NavItem>
          <a onClick={(evt) => this.props.onClick(evt, this.props.visible)}>{this.props.children}</a>
          {this.renderSubNav(this.props.subnav, this.props.visible, this.props.subnavKey)}
      </NavItem>
    );
  }

  renderSubNav (subnav, visible, subnavKey) {
    return (
      <SubNav visible={visible}>
        {this.renderSubNavItems(subnav, subnavKey)}
      </SubNav>
    );
  }

  renderSubNavItems (subnav,subnavKey) {  
    return subnav.map((item, index)=>
        <SubNavItem key={subnavKey+ '_subitem_' + index} onClick={this.props.onClose}><Link to={item.link} >{item.title}</Link></SubNavItem>
    );
  }

  handleClickOutside (event) {   
    this.props.onClose(event);
  }
}

SubNavLinkContainer.defaultProps = {
  title: '', 
  subnav: [],
};

SubNavLinkContainer.propTypes = {
  title: PropTypes.string,
  subnav: PropTypes.array,
  subnavs: PropTypes.object,
  visible: PropTypes.bool,
  subnavKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    visible: makeSelectSubnavVisible(ownProps)
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (evt, visible) => { evt.preventDefault(); return dispatch(toggleSubnav(visible, ownProps.subnavKey)) },
  onClose: (evt) => dispatch(closeSubnav(evt, ownProps.subnavKey)),
});

const withReducer = injectReducer({ key: 'subnavs', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withConnect,
  withClickOutsideListener,
)(SubNavLinkContainer); 
