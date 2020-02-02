import * as React from 'react'


function onMouseDown(e, appState, setAppState) {
    e.persist()

    const {
        clientX,
        clientY
    } = e

    const id = e.target.dataset.id

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

function onMouseDrag(e, appState, setAppState) {
    const drag = appState.drag

    const {
        originalMousePosition,
        originalTargetPosition,
        targetId
    } = drag

    const target = appState.circles[targetId]

    const {
        clientX,
        clientY
    } = e

    const vec = {
        x : clientX - originalMousePosition.x,
        y : clientY - originalMousePosition.y,
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

function onMouseMove(e, appState, setAppState) {
    if(appState.drag !== null) {
        onMouseDrag(e, appState, setAppState)
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
    return (
        <svg 
            width="600" height="400"
            onMouseDown={e=>onMouseDown(e, appState, setAppState)}
            onMouseMove={e=>onMouseMove(e, appState, setAppState)}
            onMouseUp={e=>onMouseUp(e, appState, setAppState)}
        >
            {
                Object.values(circles).map(circle=>(
                    <circle 
                        cx={circle.position.x}
                        cy={circle.position.y}
                        r = "30"
                        fill={circle.color}
                        key={circle.id}
                        data-id={circle.id}
                    />
                ))
            }
        </svg>
    )
}

export default MySvg