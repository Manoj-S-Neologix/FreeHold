import * as React from 'react';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { PrimaryButton, TextField } from '@fluentui/react';
import styles from './ViewClient.module.scss';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';
import GridTable from "../../../../Common/Table/Table";


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


const ViewClient = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const items: IBreadcrumbItem[] = [
    { text: 'Home', key: 'Home', onClick: _onBreadcrumbItemClicked },
    { text: 'View Client', key: 'View Client', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },

  ];
  return (
    <Stack className={styles.Clientcontainer} enableScopedSelectors styles={stackStyles} tokens={verticalGapStackTokens}>
      <div>
        <Breadcrumb
          items={items}
          maxDisplayedItems={10}
          ariaLabel="Breadcrumb with items rendered as buttons"
          overflowAriaLabel="More links"
        /></div>
      <div className={styles.Searchspan} >
        <PrimaryButton className={styles.Clientbutton}
          iconProps={{ iconName: 'Add' }} >
          <span > Add Client</span>
        </PrimaryButton>
        <TextField
          className={styles.searchBar}
          placeholder="Search..."
          iconProps={{ iconName: 'Search' }}
          onChange={handleSearchChange}
        />
      </div>
      <ThemeProvider primary={"#000"} secondary={"#fff"} >
        <GridTable props={props} searchQuery={searchQuery} />
      </ThemeProvider>
    </Stack>

  );
};
export default ViewClient;

