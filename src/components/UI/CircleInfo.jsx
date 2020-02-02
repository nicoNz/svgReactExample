import * as React from 'react'

const CircleInfo = ({
    circle : {
        color,
        position : {
            x,
            y
        },
        id
    }
})=>(
    <div style={{color : color}}>
        <h3>id : {id}</h3>
        <div>
            <h4>position</h4>
            <p>x : {x}</p>
            <p>y : {y}</p>
        </div>
    </div>
)

export default CircleInfo