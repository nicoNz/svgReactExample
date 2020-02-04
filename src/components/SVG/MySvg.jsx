import * as React from 'react'
import RulerX from './RulerX'
import RulerY from './RulerY'

const CORNER = 70
const SVG_WIDTH = 600
const SVG_HEIGHT = 400
const utilSpaceX =  SVG_WIDTH-CORNER
const utilSpaceY = SVG_HEIGHT-CORNER 

function onMouseDown(e, appState, setAppState) {
    e.persist()

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

function onMouseDrag(e, appState, setAppState, scale) {

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
        x : (clientX - originalMousePosition.x)/(utilSpaceX/scale.scaleX),
        y : (clientY - originalMousePosition.y)/(utilSpaceY/scale.scaleY),
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

function onMouseUp(e, appState, setAppState) {
    setAppState({
        ...appState,
        drag : null
    })
}

function onMouseMove(e, appState, setAppState, scale) {
    if(appState.drag !== null) {
        onMouseDrag(e, appState, setAppState, scale)
    }
}


const MySvg = ({
    appState,
    setAppState
})=>{

    const {
        drag,
        circles
    } = appState


    const [scale, setScale] = React.useState({
        scaleX : 20,
        offsetX : 10,
        scaleY : 10,
        offsetY : 15,
    })


    return (
        <svg 
            width={SVG_WIDTH} height={SVG_HEIGHT}
            onMouseDown={e=>onMouseDown(e, appState, setAppState, scale)}
            onMouseMove={e=>onMouseMove(e, appState, setAppState, scale)}
            onMouseUp={e=>onMouseUp(e, appState, setAppState)}
        >
            <g transform={`translate(70, 70) scale(${utilSpaceX} ${utilSpaceY})`}>
                <g>
                    <RulerX from={scale.offsetX} to={scale.offsetX+scale.scaleX} />
                </g>
                <g>
                    <RulerY from={scale.offsetY} to={scale.offsetY+scale.scaleY}/>    
                </g>
                <g transform={`scale(${1./scale.scaleX} ${1./scale.scaleY}) translate(${-scale.offsetX} ${-scale.offsetY}) `}>
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

export default MySvg