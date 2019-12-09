import React from 'react'
import TimeFix from './timefix'

const Rows = ({buses}) => {
    console.log("rows.js BEGIN")
    console.log("buses: ", buses)
    return (
        buses.map(bus =>
            <tr key={bus.id}>
                <td>{bus.linja}</td>
                <td><TimeFix timeDec={bus.lahtee} /></td>
                <td>{bus.linja_pitka}</td>
                <td>{bus.pysakki}</td>
            </tr>
        )
    )
}

export default Rows