import React from 'react'
import clsx from 'clsx'
import { Link } from '@bpanel/bpanel-ui'
import AddressValue from './AddressValue'

const InputsAndOutputs = ({
  inputs,
  outputs
}) => {
  return <div className='inputs-and-outputs row no-gutters'>
    <div className='col-12 col-lg-6 io-container'>
      <h6 className='io-title'>Inputs</h6>
      <Inputs inputs={inputs} />
    </div>
    <div className='col-12 col-lg-6 io-container'>
      <h6 className='io-title'>Outputs</h6>
      <Outputs outputs={outputs} />
    </div>
  </div>
}

const Inputs = ({ inputs }) => {
  return inputs && inputs.map((input, index) => {
    let key
    if (input.prevout && input.prevout.hash) key = input.prevout.hash
    else key = index
    return <div
      key={key} className={clsx(
        'address-value',
        inputs.length > 1 && 'mb-2'
      )}
    >
      <AddressValue
        key={key}
        address={input.address}
        coin={input.coin}
      />
    </div>
  })
}

const Outputs = ({ outputs }) => {
  return outputs && outputs.map((output, index) => {
    return <div
      key={index}
      className={clsx(
        'address-value',
        outputs.length > 1 && 'mb-2'
      )}
    >
      <Output output={output} />
    </div>
  })
}

const Output = ({ output }) => {
  return <div className='d-flex justify-content-between'>
    <span
      className={clsx(
        'address-text',
        output.value ? 'col-sm-8' : 'col-sm-12'
      )}
    >
      <Link className='x-link' to={`/address/${output.address}`}>{output.address}</Link>
    </span>
    <span
      className={clsx(
        'input-amount',
        output.value ? 'col-sm-4 text-right' : 'col-sm-4-hidden'
      )}
    >
      {output.value && `${output.value / 1e8} FLO`}
    </span>
  </div>
}

export default InputsAndOutputs
