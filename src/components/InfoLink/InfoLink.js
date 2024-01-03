import React from 'react'
import { IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import styles from './InfoLink.module.css'

const InfoLink = () => {
    return (
        <a
            href="https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/maintaining-the-system/scheduling.html"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className={styles.icon}>
                <IconInfo16 />
            </span>
            {i18n.t('About the scheduler')}
        </a>
    )
}

export default InfoLink
