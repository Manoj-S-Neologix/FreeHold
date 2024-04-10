import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { PrimaryButton, TextField } from '@fluentui/react';
import styles from './Addclient.module.scss'
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import Table from '../../../../Common/Table/Table';
import {ThemeProvider} from '../../../../Common/ThemeProvider/Themeprovider';


function _onBreadcrumbItemClicked(ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void {
  console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
}


const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};


const Addclient = (props: any) => {
  const items: IBreadcrumbItem[] = [
    { text: 'Home', key: 'Home', onClick: _onBreadcrumbItemClicked },
    { text: 'View Client', key: 'View Client', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },

  ];
  return (
    // <div className={styles.container}>


    //   <Breadcrumb

    //     items={items}
    //     maxDisplayedItems={10}
    //     ariaLabel="Breadcrumb with items rendered as buttons"
    //     overflowAriaLabel="More links"
    //   />
    //   <div className={styles.Addcontainer}>
    //     <div className={styles.Addbutton}>


    //       <PrimaryButton>
    //         <span>Add Client</span>
    //       </PrimaryButton>

    //       <TextField
    //         placeholder="Search..."
    //         className={styles.searchBar}
    //         iconProps={{ iconName: 'Search' }}

    //       />

    //     </div>
    //   </div>


      <Stack  className={styles.Clientcontainer} enableScopedSelectors styles={stackStyles} tokens={verticalGapStackTokens}>
        <div>    
          <Breadcrumb
          items={items}
          maxDisplayedItems={10}
          ariaLabel="Breadcrumb with items rendered as buttons"
          overflowAriaLabel="More links"
        /></div>

        <div className={styles.Searchspan} > 
       
        <PrimaryButton className={styles.Clientbutton}
        iconProps ={{iconName:'Add', style: { color: 'red' } }} >
        <span > Add Client</span>
        </PrimaryButton>

          <TextField className={styles.searchBar}
            placeholder="Search..."           
            iconProps={{ iconName: 'Search' }}
            
          />

          </div>
          <ThemeProvider primary={"#000"} secondary={"#fff"} >
       
            <Table />
          </ThemeProvider>

      {/* <Table/> */}
      </Stack>

  )
}
export default Addclient;

