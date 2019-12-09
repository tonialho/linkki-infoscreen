import React from 'react'

const timeFix = ({timeDec}) => {
    console.log("timeFix.js BEGIN")
    const hours = Math.floor(timeDec * 24)
    const minutes = Math.round((timeDec * 24 - hours) * 60)

    if(minutes < 10) {
        return (
            <p>
            {hours}:0{minutes}
            </p>
        )
    }

    else {
        return (
            <p>
            {hours}:{minutes}
            </p>
        )
    }
}

export default timeFix