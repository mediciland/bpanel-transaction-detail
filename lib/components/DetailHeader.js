import React from 'react'
import * as PropTypes from 'prop-types'
import copyToClipboard from '../../../bpanel-block-detail/lib/helpers/copyToClipboard'

const DetailHeader = ({
  title,
  confirmations,
  hash
}) => {
  return (
    <div className='row' style={{ marginBottom: '20px' }}>
      <h3 className='col-sm-8'>{title}</h3>
      <p className='col-sm-4 text-right' style={{ fontSize: '16px' }}>
        <strong>{confirmations} Confirmations</strong>
      </p>
      <p
        onClick={copyToClipboard(hash)}
        className='col-sm-12 word-break-all'
      >
        <b>Hash </b>
        <span className='cursor-copy font-size-primary'>{hash}</span>
      </p>
    </div>
  )
}

DetailHeader.propTypes = {
  title: PropTypes.string,
  confirmations: PropTypes.number,
  hash: PropTypes.string
}

export default DetailHeader
