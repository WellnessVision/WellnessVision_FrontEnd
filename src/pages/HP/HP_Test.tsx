import React from 'react'

const HP_Test = () => {
  return (
    <div>
<button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

<div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      ...
    </div>
  </div>
</div>
<button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>

<div className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm">
    <div className="modal-content">
      ...
    </div>
  </div>
</div>
    </div>
  )
}

export default HP_Test