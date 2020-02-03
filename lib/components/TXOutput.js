import React from 'react'
import AddressValue from './AddressValue'

const TXOutput = ({output}) => {
  return <div className='card' style={{color: '#000', marginTop: '5px'}}>
    <AddressValue 
      address={output.address} 
      script={output.script}
      coin={{value: output.value}}
    />
  </div>
}

export default TXOutput