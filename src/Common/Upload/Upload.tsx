
import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import styles from './Upload.module.scss';

const Upload = (props: any) => {
    return (
        <div className={styles.uploadModule}>
            <PrimaryButton
                iconProps={{ iconName: 'Upload' }}
                className={styles.uploadButton} >
                <span className="text-captialize">Upload Documents</span>
            </PrimaryButton>
        </div>
    );
};

export default Upload;
