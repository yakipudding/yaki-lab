import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// タブメニュー
export interface TabMenuProps {index: null | number, admin: boolean}
const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const TabMenu = (props: TabMenuProps) => {
  if(props.admin){
    return (
      <Tabs value={props.index} centered>
        <Tab label="ARTICLES" {...a11yProps(0)} href="/AdminDashboard" />
        <Tab label="PRODUCTS" {...a11yProps(1)} href="/AdminProductDashboard" />
        <Tab label="ABOUT" {...a11yProps(2)} href="/AdminEditAbout" />
      </Tabs>
    );
  }
  else{
    return (
      <Tabs value={props.index} centered>
        <Tab label="ARTICLES" {...a11yProps(0)} href="/" />
        <Tab label="PRODUCTS" {...a11yProps(1)} href="/Products.html" />
        {/* <Tab label="ABOUT" {...a11yProps(2)} href="/About" /> */}
      </Tabs>
    );
  }
}

export default TabMenu