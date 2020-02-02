import * as React from 'react'


const DragInfo = ({
    dragInfo : {
        targetId, 
        originalMousePosition : {
            x : originalMousePositionX,
            y : originalMousePositionY
        },
        originalTargetPosition : {
            x : originalTargetPositionX,
            y : originalTargetPositionY
        }
    }
})=>(
    <div>
        <h3>DRAG INFO</h3>

        <h4>id : {targetId}</h4>
        <div>
            <h4>originalMousePosition</h4>
            <p>x : {originalMousePositionX}</p>
            <p>y : {originalMousePositionY}</p>
        </div>
        <div>
            <h4>originalTargetPosition</h4>
            <p>x : {originalTargetPositionX}</p>
            <p>y : {originalTargetPositionY}</p>
        </div>
    </div>
)

export default DragInfo