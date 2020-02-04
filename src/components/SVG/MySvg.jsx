import * as React from 'react'
import RulerX from './RulerX'
import RulerY from './RulerY'

const CORNER = 70
const SVG_WIDTH = 600
const SVG_HEIGHT = 400
const utilSpaceX =  SVG_WIDTH-CORNER
const utilSpaceY = SVG_HEIGHT-CORNER 




class MySvg extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            scale : {
                scaleX : 20,
                offsetX : 10,
                scaleY : 10,
                offsetY : 15,
            },
            cursor : {
                x : 15,
                y : 20
        
            }
        }

        this.onMouseDown=this.onMouseDown.bind(this)
        this.onMouseMove=this.onMouseMove.bind(this)
        this.onMouseUp=this.onMouseUp.bind(this)
        this.onWheel=this.onWheel.bind(this)

    }

    render(){

        const {
            state, 
            props,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onWheel
        } = this

        const {
            appState,
        } = props

        const {
            scale,
            cursor
        } = state

       const {
           circles
       } = appState
   
       return (
           <svg 
               width={SVG_WIDTH} height={SVG_HEIGHT}
               onMouseDown={onMouseDown}
               onMouseMove={onMouseMove}
               onMouseUp={onMouseUp}
               onWheel={onWheel}
           >
               <g transform={`translate(${CORNER} ${CORNER}) scale(${utilSpaceX} ${utilSpaceY})`}>
                   <g>
                       <RulerX from={scale.offsetX} to={scale.offsetX+scale.scaleX} />
                   </g>
                   <g>
                       <RulerY from={scale.offsetY} to={scale.offsetY+scale.scaleY}/>    
                   </g>
                   <rect x={0} y={0} fill="#eeeeee" width={1} height={1}/>
                   <g transform={`scale(${1./scale.scaleX} ${1./scale.scaleY}) translate(${-scale.offsetX} ${-scale.offsetY}) `}>
                       <line strokeWidth={.02} stroke="#000000" x1={cursor.x} x2={cursor.x} y1={-100000} y2={100000}/>
                       <line strokeWidth={.02} stroke="#000000" y1={cursor.y} y2={cursor.y} x1={-100000} x2={100000}/>
                       {
                           Object.values(circles).map(({
                               position : {
                                   x,
                                   y
                               },
                               color,
                               id
                           })=>(
                               <circle 
                                   cx={x}
                                   cy={y}
                                   r=".2"
                                   
                                   fill={color}
                                   key={id}
                                   data-id={id}
   
                               />
                           ))
                       }
                   </g>
               </g>
               
           </svg>
       )
   }


    onMouseDown(e) {

        const {
            appState,
            setAppState
        } = this.props

        const {
            clientX,
            clientY
        } = e

        const id = e.target.dataset.id
        if(!id) {
            return
        }
        const circle = appState.circles[id]
        if(!circle) {
            return
        }

        const targetedCirclePosition = appState.circles[id].position

        setAppState({
            ...appState,
            drag : {
                targetId : id,
                originalMousePosition : {
                    x : clientX,
                    y : clientY
                },
                originalTargetPosition : {
                    x : targetedCirclePosition.x,
                    y : targetedCirclePosition.y
                }
            }
        })
    }

    onMouseDrag(e ) {


        const {
            appState,
            setAppState
        } = this.props

        const {
            scaleX,
            scaleY
        } = this.state.scale

        const {
            drag : {
                originalMousePosition,
                originalTargetPosition,
                targetId
            },
            circles
        } = appState


        const target = circles[targetId]

        const {
            clientX,
            clientY
        } = e

        const vec = {
            x : (clientX - originalMousePosition.x)/(utilSpaceX/scaleX),
            y : (clientY - originalMousePosition.y)/(utilSpaceY/scaleY),
        }

        setAppState({
            ...appState,
            circles : {
                ...appState.circles,
                [targetId] : {
                    ...target,
                    position : {
                        x : originalTargetPosition.x + vec.x ,
                        y : originalTargetPosition.y + vec.y 
                    }
                }
            }
        })
    }

    onMouseUp(e) {
        this.props.setAppState({
            ...this.props.appState,
            drag : null
        })
    }

    onMouseMove(e) {

        const {
            appState,
            
        } = this.props

        if(appState.drag !== null) {
            this.onMouseDrag(e)
        } 

        if(!e.target.farthestViewportElement) {
            return 
        }

        const {
            scaleX,
            scaleY,
            offsetX,
            offsetY
        } = this.state.scale

        const {
            clientLeft,
            clientTop
        } = e.target.farthestViewportElement

        const {
            clientX,
            clientY
        } = e

        const relPosX = clientX - clientLeft - CORNER
        const relPosY = clientY - clientTop - CORNER

        const x = (relPosX/utilSpaceX) * scaleX + offsetX
        const y = (relPosY/utilSpaceY) * scaleY + offsetY


        this.setState({
            cursor : {
                x,
                y 
            }
        })
    }

    onWheel(e) {
            
        const inc = e.deltaY
        this.setState(({scale})=>({
            scale : {
                ...scale,
                scaleX : scale.scaleX + inc,
                scaleY : scale.scaleY + inc
            }
        }))
    }
}

export default MySvg