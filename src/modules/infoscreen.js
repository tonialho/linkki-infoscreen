import React, {useState} from 'react'
import TimeFix from './timefix'
import Rows from './rows'
import {timetable} from './../db.json'

const ONEHOUR = 1/24

const Infoscreen = () => {
    console.log("infoscreen.js BEGIN")
    console.log("timetable:", timetable)
    
    const weekDayNumber = new Date().getDay()
    const hour = new Date().getHours()
    const minutes = new Date().getMinutes()
    console.log("Weekday number:", weekDayNumber, " clock", hour, ":", minutes)

    const timeAsDecimal = hour * ONEHOUR + minutes * ONEHOUR/60
    console.log("time in decimal form", timeAsDecimal)

//  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const stops = ["Urhonkatu 1", "Urhonkatu 2", "Tourunsilta 1", "Tourunsilta 2"]
    const [stopIndex, setStopIndex] = useState(0)

    const [showAll, setShowAll] = useState(true)

    // Choose next stop from the array "stops"
    const handleStops = (i) => {
        if (i < stops.length - 1)
            setStopIndex(i+1)
        else {
            setStopIndex(0)
        }
    }

    // Return correct "vkopaiva" value
    const handleVkoPaiva = () => {
        if (new Date().getDate() === 24 && new Date().getMonth() === 12) {
            console.log("JOULUAATTO")
            return "Jouluaatto"
        }

        else if (0 < weekDayNumber < 5)
            return "M-P talvi"

        else if (weekDayNumber === 0)
            return "S - talvi"

        else if (weekDayNumber === 6)
            return "L - talvi"
    }

    const HandleNextLine = () => {

        if(timetable === null) {
            return (
                <p>Loading timetable</p>
            )
        }

        if(showAll) {
            const busesAtThatDay = timetable.filter(bus => bus.vkopaiva === handleVkoPaiva())
            console.log("busesAtThatDay: ", busesAtThatDay)
            const foundBuses = busesAtThatDay.filter(bus => bus.lahtee > timeAsDecimal && bus.lahtee < timeAsDecimal + 0.007)
            console.log("foundBuses: ", foundBuses)

            if(foundBuses.length === 0) {
                return (
                    <p>Ei lähteviä linkkejä varttiin</p>
                )
            }
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Linja</th>
                                <th>Lähtee</th>
                                <th>Reitti</th>
                                <th>Pysäkiltä</th>
                            </tr>
                            <Rows buses={foundBuses} />
                        </tbody>
                    </table>
                </div>
            )
        }

        else {
            const busesFromStop = timetable.filter(bus => bus.pysakki === stops[stopIndex])
            console.log("busesFromStop ", busesFromStop)
            const busesAtThatDay = busesFromStop.filter(bus => bus.vkopaiva === handleVkoPaiva())
            console.log("busesAtThatDay: ", busesAtThatDay)
            const foundBuses = busesAtThatDay.filter(bus => bus.lahtee > timeAsDecimal && bus.lahtee < timeAsDecimal + 0.0105)
            console.log("foundBuses: ", foundBuses)

            if(foundBuses.length === 0) {
                return (
                    <p>Ei lähteviä linkkejä varttiin</p>
                )
            }
            return (
                <div>
                    <h3 id="stops">{stops[stopIndex]} <br/> <button onClick={() => handleStops(stopIndex) } >Seuraava pysäkki</button></h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Linja</th>
                                <th>Lähtee</th>
                                <th>Reitti</th>
                                <th>Pysäkiltä</th>
                            </tr>
                            <Rows buses={foundBuses} />
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    const handleShowAll = () => {
        setShowAll(!showAll)
    }

    const showing = showAll
        ? "kaikki"
        : "pysäkeittäin"
    

    return (
        <div>
            <button id="stopsButton" onClick={() => handleShowAll()}>Näytä {showing}</button>
            <br/> <br/>
            <HandleNextLine />
        </div>
    )
}

export default Infoscreen