import React from 'react'
import { Currency } from '@bpanel/bpanel-utils'
import { Link } from '@bpanel/bpanel-ui'
import HexEditor from 'react-hex-editor'
import clsx from 'clsx'

const UNKNOWN = 'No Inputs (Newly Generated Coins)'

const AddressValue = ({ address, script, coin = {} }) => {
  let amount
  if (coin.value) {
    amount = new Currency('flo', coin.value).toCoins()
  }

  let scriptType
  if (!amount && script && script.substr(0, 4) === '6a24') {
    // scriptType = "OP_RETURN " + script.substr(5,script.length)
    scriptType = (
      <div>
        OP_RETURN
        <HexEditor
          height={111}
          columns={12}
          data={script.match(/.{1,2}/g)}
          showAscii
          readOnly
          autoFocus={false}
        />
      </div>
    )
  }

  const _address = address || coin.address
  let addressLink = _address || scriptType || UNKNOWN
  if (_address) {
    addressLink = <Link to={`/address/${_address}`} className='x-link'>
      {addressLink}
    </Link>
  }

  return (
    <div className='d-flex'>
      <span
        className={clsx(
          'address-text',
          amount ? 'col-sm-8' : 'col-sm-12'
        )}
      >
        {addressLink}
      </span>
      <span
        className={clsx(
          'input-amount',
          amount ? 'col-sm-4 text-right' : 'col-sm-4-hidden'
        )}
      >
        {amount} {amount ? 'FLO' : ''}
      </span>
    </div>
  )
}

export default AddressValue
