
const SetTimer = (props) => {
    const id = props.title.toLowerCase()
      return (
        <div className="formulaScreen">
            <div className='timer-container'>
                <span id={id+'-label'} className='fs-4'>{props.title} Length</span>
                <div>
                <button id={id+'-decrement'} className="btn btn-outline-success fs-4" onClick={props.runDisminuir}>
                  <i className="fa fa-minus"></i>
                </button>
                <span id={id+'-length'} className="bs-length"
            
                >{props.count}</span>
                <button id={id+'-increment'}className='btn btn-outline-success fs-4' onClick={props.runAumentar}>
                  <i className="fa fa-plus"></i>
                </button>
                </div>
          </div>
        </div>
      )
    }
export default SetTimer