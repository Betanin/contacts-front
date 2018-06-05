import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApplicationBar from './ApplicationBar';

storiesOf('ApplicationBar', module)
    .add('simple', () => (
        <MuiThemeProvider>
            <ApplicationBar
                title="Contacts"
                fieldDescription="Search"
                onFieldChange={(value) => action('handle field changed')(value)}
            />
        </MuiThemeProvider>
    ))
    .add('with menu', () => (
        <MuiThemeProvider>
            <ApplicationBar
                title="Contacts"
                fieldDescription="Search"
                onFieldChange={(value) => action('handle field changed')(value)}
                menuItems={[
                    {
                        text: 'Item 1',
                        disabled: false,
                        onClick: () => action('action menu 1')(),
                    },
                    {
                        text: 'Item 2',
                        disabled: true,
                        onClick: () => action('action menu 2')(),
                    },
                    {
                        text: 'Item 3',
                        onClick: () => action('action menu 3')(),
                    },
                    {
                        text: 'Item 4',
                    },
                ]}
            />
        </MuiThemeProvider>
    ));    