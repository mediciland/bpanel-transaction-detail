import React, { useEffect, useState } from 'react'
import { UXTX } from '@bpanel/bpanel-utils'
import { Link, Button } from '@bpanel/bpanel-ui'
import DetailHeader from './DetailHeader'
import SummaryBlock from './SummaryBlock'
import TransactionSummary from './TransactionSummary'

const TXDetail = ({ isLoading, history, match, getTX, transactions }) => {
  const [tx, setTX] = useState()
  const [error, setError] = useState(undefined)

  useEffect(
    () => {
      if (!isLoading && match.params.txid) {
        getTX(match.params.txid, tx => {
          if (tx) {
            setTX(tx)
          } else {
            setError(true)
          }
        })
      }
    },
    [isLoading, match.params.txid]
  )

  if (error) {
    return (
      <div className='alert alert-warning' role='alert'>
        <Button
          class='btn btn-warning'
          className='col-xl-3'
          onClick={() => window.location = '/'}
        >
          Go Back
        </Button>
        <br />
        <br />
        <p> Transaction Not Found! </p>
        <p> Please check the txid and try again. </p>
        <p> Requested URL: /tx/{match.params.txid} </p>
      </div>
    )
  }

  if (!tx) return <p>loading...</p>

  const uxtx = UXTX.fromRaw(tx.hex, 'hex', {
    constants: { DATE_FORMAT: 'MMMM Do YYYY, h:mm:ss a' },
    json: tx
  })


  let blockHash
  for (const blockId in transactions) {
    if (transactions[blockId]){
      if (transactions[blockId][tx.hash]) {
        blockHash = blockId
      }
    }
  }
  const blockLink = <Link to={`/block/${blockHash}`}>
    <span style={{ fontSize: 14 }}>{tx.height}</span>
  </Link>

  const summaryMapData = {
    'MINED: ': tx.mtime,
    'SIZE: ': uxtx.getSize(),
    'INCLUDED IN BLOCK: ': blockLink,
    'FEE RATE: ': tx.rate
  }
  return (
    <div className='container'>
      <DetailHeader
        title={uxtx.getUXType() + 'Transaction'}
        confirmations={tx.confirmations}
        hash={tx.hash}
      />
      <SummaryBlock
        mappedData={summaryMapData}
      />
      <TransactionSummary tx={tx} />
    </div>
  )
}

export default TXDetail
