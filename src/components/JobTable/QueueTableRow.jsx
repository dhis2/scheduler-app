import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    TableRow,
    TableCell,
    IconChevronDown24,
    IconChevronUp24,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { JobSwitch } from '../Switches'
import QueueActions from './QueueActions'
import Status from './Status'
import NextRun from './NextRun'
import Schedule from './Schedule'
import ExpandableRow from './ExpandableRow'
import styles from './QueueTableRow.module.css'

const QueueTableRow = ({
    queue: {
        id,
        name,
        cronExpression,
        status,
        nextExecutionTime,
        enabled,
        configurable,
        sequence,
    },
    refetch,
}) => {
    const [showJobs, setShowJobs] = useState(false)
    const handleClick = () => setShowJobs((prev) => !prev)

    return (
        <>
            <TableRow>
                <TableCell>
                    <button
                        className={styles.button}
                        onClick={handleClick}
                        title={
                            showJobs ? i18n.t('Hide jobs') : i18n.t('Show jobs')
                        }
                    >
                        {showJobs ? <IconChevronUp24 /> : <IconChevronDown24 />}
                    </button>
                </TableCell>
                <TableCell role="rowheader">{name}</TableCell>
                <TableCell>{i18n.t('Queue')}</TableCell>
                <TableCell>
                    <Schedule cronExpression={cronExpression} />
                </TableCell>
                <TableCell>
                    <NextRun
                        nextExecutionTime={nextExecutionTime}
                        enabled={enabled}
                    />
                </TableCell>
                <TableCell>
                    <Status status={status} />
                </TableCell>
                <TableCell>
                    {/* A queue can be toggled by toggling the first job in the queue */}
                    <JobSwitch
                        id={id}
                        checked={enabled}
                        disabled={!configurable}
                        refetch={refetch}
                    />
                </TableCell>
                <TableCell>
                    <QueueActions
                        name={name}
                        refetch={refetch}
                        id={id}
                        enabled={enabled}
                    />
                </TableCell>
            </TableRow>
            {showJobs
                ? sequence.map((job) => (
                      <ExpandableRow key={job.id} job={job} />
                  ))
                : null}
        </>
    )
}

const { shape, string, bool, func, arrayOf, object } = PropTypes

QueueTableRow.propTypes = {
    queue: shape({
        name: string.isRequired,
        enabled: bool.isRequired,
        id: string.isRequired,
        status: string.isRequired,
        cronExpression: string,
        nextExecutionTime: string,
        sequence: arrayOf(object).isRequired,
    }).isRequired,
    refetch: func.isRequired,
}

export default QueueTableRow
