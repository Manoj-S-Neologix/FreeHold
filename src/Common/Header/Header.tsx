import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
// import fetchUserName from '../Header/apiService'; 

const Header = ({props}: any) => {
    const [userName] = React.useState(props.props.userDisplayName);

    console.log(props,"name")


    const stackTokens: IStackTokens = { childrenGap: 10 };

    return (
        <Stack horizontal tokens={stackTokens} styles={{ root: { padding: '10px' } }}>
            <Stack.Item grow={8}>
                <img
                    src={require('/src/assets/Logo/freeholdsolutions.png')}
                    width="150"
                    height="50"
                    alt="Logo"
                    style={{ marginLeft: '30px' }}
                />
            </Stack.Item>
            <Stack.Item grow={4} align="end">
                <Stack horizontalAlign="end">
                    <Persona
                        imageUrl=""
                        text={userName}
                        size={PersonaSize.size32}
                        imageAlt={userName}
                        styles={{ primaryText: { fontSize: '14px' }, root: { margin: '10px' } }}
                    />
                </Stack>
            </Stack.Item>
        </Stack>
    );
};

export default Header;


