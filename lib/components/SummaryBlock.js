import React from 'react'

const BlockSummary = ({
  mappedData = {}
}) => {
  const keys = Object.keys(mappedData)
  const halfLength = Math.ceil(keys.length / 2)

  const firstHalf = keys.splice(0, halfLength)

  return <div id='block-summary'>
    <h4>Summary</h4>
    <div className='row' style={{ marginBottom: '20px' }}>
      <div className='col-sm-6'>
        {firstHalf.map(k => {
          return <SummaryDetail
            title={k}
            key={k}
            value={mappedData[k]}
          />
        })}
      </div>
      <div className='col-sm-6'>
        {keys.map(k => {
          return <SummaryDetail
            title={k}
            key={k}
            value={mappedData[k]}
          />
        })}
      </div>
    </div>
  </div>
}

const SummaryDetail = ({
  title,
  value
}) => {
  return <div className='space-between'>
    <span style={{ fontSize: '12px' }}><strong>{title}</strong></span>
    <span style={{ fontSize: '14px' }}>{value}</span>
  </div>
}

export default BlockSummary
