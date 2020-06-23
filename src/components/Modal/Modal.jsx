import React from "react";


export default function Modal(props) {
  return (
    <div className="modal" style={{display: 'block'}} tabIndex="-1" role="dialog">
      <div className="modal-dialog my-5" role="document">
        <div className="modal-content" style={{backgroundColor: '#FFFBEF'}}>
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
            onClick={(e) => props.handleModal(true)}>
              {props.positiveAnswer}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={(e) => props.handleModal(false)}
            >
              {props.negativeAnswer}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
