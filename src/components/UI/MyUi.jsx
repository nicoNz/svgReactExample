import * as React from 'react'
import CircleInfo from './CircleInfo'
import DragInfo from './DragInfo'

const MySvg = ({
    appState,
})=>{

    const {
        drag,
        circles
    } = appState

    return (
        <div>
            <div>
                {
                    drag === null
                    ? <h2>No DragInfo</h2>
                    : <DragInfo dragInfo={drag}/>
                }
                {
                    Object.values(circles).map(circle=>(
                        <CircleInfo key={circle.id} circle={circle} />
                    ))

                }

            </div>
        </div>
    )
}

export default MySvg