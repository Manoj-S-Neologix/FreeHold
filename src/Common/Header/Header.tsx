import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';


const Header = ({ props }: any) => {
    const [userName] = React.useState(props.props.userDisplayName);

    return (
        <div className={styles.HeaderPart}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <div className={styles.col12}>
                        <div className={`${styles.col8} `}>
                        <Link to ='/'> 
                            <img
                                src={require('/src/assets/Logo/freeholdsolutions.png')}
                                width="150"
                                height="50"
                                alt="Logo"
                                style={{ marginLeft: '7px' }}
                            />
                            </Link>
                        </div>
                        <div className={` ${styles.col2}`}>
                            <Persona
                                imageUrl=""
                                text={userName}
                                size={PersonaSize.size32}
                                imageAlt={userName}
                                styles={{
                                    primaryText: { fontSize: '14px' },
                                    root: { margin: '10px', marginLeft:'52px' }
                                }}
                            /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

