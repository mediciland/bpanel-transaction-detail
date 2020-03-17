import React from 'react'
import moment from 'moment'
import { Link } from '@bpanel/bpanel-ui'
import InputsAndOutputs from './InputsAndOutputs'
import copyToClipboard from '../../../bpanel-block-detail/lib/helpers/copyToClipboard'

const BUFFER = 'Buffer'

function getOutputs (outputs) {
  let total = 0
  for (const o of outputs) {
    total += o.value
  }
  // convert satoshis
  return total / 1e8
}

const TransactionSummary = ({ tx }) => {
  const { floData } = tx
  let floDataString = ''
  if (floData.type === BUFFER) {
    floDataString = Buffer.from(floData.data).toString()
  }
  return <div className='transaction-summary container'>
    <div
      className='transaction-header row no-gutters py-2'
      id='transaction-header'
      style={{ wordBreak: 'break-all' }}
    >
      <Link
        to={`/tx/${tx.hash}`}
        id='transaction-hash-link'
        className='x-link col-12 col-xl-8'
      >
        {tx.hash}
      </Link>
      <span
        className='col-12 col-xl-4 text-right'
      >
        mined {moment(tx.mtime * 1000).format('MMM Do YYYY, h:mm:ss a')}
      </span>
    </div>
    <InputsAndOutputs inputs={tx.inputs} outputs={tx.outputs} />
    <div className='flo-tx-metadata row justify-content-between no-gutters my-3'>
      <span className='flo-data-badge'>
        FEE: {tx.fee / 1e8} FLO
      </span>
      <div style={{ display: 'inherit' }}>
        <span className='flo-data-badge mr-3'>
          {tx.confirmations} Confirmations
        </span>
        <span className='flo-data-badge'>
          {getOutputs(tx.outputs)} FLO
        </span>
      </div>
    </div>
    <div className='row no-gutters flex-column flo-data-container'>
      <h6 className='w-100 flo-data-title'>Flodata</h6>
      <span className='scroll-x-auto w-100'>
        <p className='flo-data m-0 cursor-copy' onClick={copyToClipboard(floDataString)}>{floDataString}</p>
      </span>
    </div>
  </div>
}

export default TransactionSummary
