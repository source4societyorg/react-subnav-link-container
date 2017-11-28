# react-subnav-link-container
A Higher Order Component (HOC) container for sub navigation menus that show/hide when toggled. Will hide when clicking outside of the container. Relies on React, Redux, and Reselect

## Requirements

This library expects that you are using [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate). 

You must roll your own styled version of the following components:

    NavItem    //Component to wrap the menu item that has a sub menu. Can be reused for your other nav items
    SubNav     //This is the toggle-able panel that holds your subnav items
    SubNavItem //The individual items within the subnav panel

   
Please be sure you have the following in your package.json:

    "dependencies": {
      "babel-polyfill": "6.23.0",
      "immutable": "3.8.1",
      "invariant": "2.2.2",
      "prop-types": "15.5.10",
      "react": "15.6.1",
      "react-dom": "15.6.1",
      "react-redux": "5.0.5",
      "redux": "3.6.0",
      "redux-immutable": "4.0.0",
      "reselect": "3.0.1",
      "styled-components": "2.0.0",
      "react-onclickoutside": "^6.7.0",    
      "warning": "3.0.0"
    }

## Installation

Pleas be sure you have the requirements mentioned in the previous section installed.

We recommending forking this repository and using as a submodule. To use as a git submodule in your project, navigate to your containers directory and run:

    git submodule add git@github.com:source4societyorg/react-subnav-link-container.git

Replace the url with the url of your fork as needed.

For more information on how to use submodules, refer to the [git submodule reference](https://git-scm.com/docs/git-submodule) and this article from [TechJini](http://www.techjini.com/blog/working-with-git-submodules/)

## Example

In your component that handles your page layout, import the SubNavLinkContainer element as follows:

    import SubNavLinkContainer from 'containers/SubNavLinkContainer';

Then add the component `<SubNavLinkContainer>Your Subnav Title</SubNavLinkContainer>` to your layout with the appropriate subnav items passed as props. The element can contain child components (such as the Caret component in the example below). Be sure to use a unique subnavKey for each SubNavLinkContainer element so that they can maintain separate redux states from each other:

	  <NavItemContainer>
		<NavItem><Link to="/">View Recalls</Link></NavItem>
		<NavItem><Link to="/recalls/add">Add Recall</Link></NavItem>
		<NavItem><Link to="/recalls/send">Send Recalls</Link></NavItem>
		<NavItem><Link to="/facility/list">Dashboard</Link></NavItem>
		<SubNavLinkContainer
			subnav={[
				{link:'/drug-shortages/list', title: 'Drug Shortages'},
				{link:'/courses/list', title: 'Courses'},
				{link:'/admin/settings', title: 'Settings'},
				{link:'/admin/tags', title: 'Department Tags'},
				{link:'/admin/liaisons', title: 'Liaisons'},
				{link:'/admin/welcome-emails', title: 'Welcome Emails'},
			]}
			subnavKey="Admin"
		>
			Admin <Caret />
		</SubNavLinkContainer> 
		<SubNavLinkContainer
			subnav={[
				{link:'/organization/list', title: 'Facilility Billing Records'},
				{link:'/billing/reports', title: 'Print Materials'},
				{link:'/invoices/generate', title: 'Create Invoice Numbers'},
			]}
			subnavKey="Billing"
		>
			Billing <Caret />
		</SubNavLinkContainer>    
		<NavItem><Link to="/reports/activity">Activity</Link></NavItem>
		<NavItem><Link to="/users/list">Users</Link></NavItem>
	  </NavItemContainer>

