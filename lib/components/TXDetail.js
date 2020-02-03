import React, { useEffect, useState } from 'react'
import { UXTX } from '@bpanel/bpanel-utils';

import TXInput from './TXInput'
import TXOutput from './TXOutput'

const TXDetail = ({
  isLoading,
  history,
  match,
  getTX
}) => {
  const [tx, setTX] = useState()
  useEffect(() => {
    if (!isLoading && match.params.txid){
      getTX(match.params.txid, setTX)
    }
  }, [isLoading, match.params.txid])

  if (!tx) return <p>loading...</p>

  let uxtx = UXTX.fromRaw(tx.hex, 'hex', { constants: { DATE_FORMAT: 'MMMM Do YYYY, h:mm:ss a' }, json: tx })
  console.log(uxtx)

  return <div className="container">
    <div className="row" style={{marginBottom: '20px'}}>
      <h3 className='col-sm-8'>{uxtx.getUXType()} Transaction</h3>
      <p className='col-sm-4 text-right' style={{fontSize: '16px'}}><strong>{tx.confirmations} Confirmations</strong></p>
      <h5 className='col-sm-12 text-center'>{tx.hash}</h5>
    </div>
    <div className="row">
      <div className='col-sm-6'>
        <div>
          <span style={{fontSize: '12px'}}><strong>MINED: </strong></span> 
          <span style={{fontSize: '14px'}}>{tx.mtime}</span>
        </div>
        <div>
          <span style={{fontSize: '12px'}}><strong>SIZE: </strong></span> 
          <span style={{fontSize: '14px'}}>{uxtx.getSize()}</span>
        </div>
      </div>
      <div className='col-sm-6'>
        <div>
          <span style={{fontSize: '12px'}}><strong>INCLUDED IN BLOCK: </strong></span> 
          <span style={{fontSize: '14px'}}>{tx.height}</span>
        </div>
        <div>
          <span style={{fontSize: '12px'}}><strong>FEE RATE: </strong></span> 
          <span style={{fontSize: '14px'}}>{tx.rate}</span>
        </div>
      </div>
    </div>
    <div className="row" style={{marginTop: '50px'}}>
      <div className='col-sm-6'>
        <h5>Inputs</h5>
      </div>
      <div className='col-sm-6'>
        <h5>Outputs</h5>
      </div>
    </div>
    <div className="row" style={{height: '100%'}}>
      <div className='col-sm-6' style={{height: '100%'}}>
        {tx.inputs.map((input) => {
          return <TXInput input={input} />
        })}
      </div>
      <div className='col-sm-6' style={{height: '100%'}}>
        {tx.outputs.map((output) => {
          return <TXOutput output={output} />
        })}
      </div>
    </div>
  </div>
}

export default TXDetail