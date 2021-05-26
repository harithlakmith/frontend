import React from "react"
const TaskList = (props) => {
    return (
      props.taskList.map((val, idx) => {
        let halt = `halt-${idx}`, price = `price-${idx}`, time = `time-${idx}`, dist = `dist-${idx}`
        return (
          <tr key={val.index}>
            <td><input class="form-control" name="halt" type="text" data-id={idx} id={halt} onChange={this.handleChange} /*value={this.state.halt}*/ ></input></td>
                <td><input class="form-control" name="price" type="text" data-id={idx} id={price} onChange={this.handleChange} /*value={this.state.price}*/ ></input></td>
                <td><input class="form-control" name="time" type="text" data-id={idx} id={time} onChange={this.handleChange} /*value={this.state.time}*/></input></td>
                <td><input class="form-control" name="dist" type="text" data-id={idx} id={dist} onChange={this.handleChange}/* value={this.state.dist*}*/></input></td>
                <td><button type="submit" onClick={this.UpdateRouteInfo} class="btn btn-primary btn-sm" >
                    Update
                </button></td>
            <td>
              {
              idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
              : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
              }
            </td>
          </tr >
        )
      })
    )
  }
export default TaskList