import React from "react";
import { useState } from "react";
import s from "./xo.module.css"
import krest from "../../../assets/krestik.png"
import nolik from "../../../assets/nolik.png"

let Xo = () => {

    let [areaState, setAreaState] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    let [size, setSize] = useState(3)
    let [currentPos, setCurrentPos] = useState(true)
    let [winner, setWinner] = useState('')

    let winnerTest = () => {
        let gamer = (currentPos ? 'Крестики' : 'Нолики')
        let marker = (currentPos ? 'X' : 'O')
        let winTest = false
        let mainDiag = true
        let subDiag = true
        let row = true
        let column = true

        for (let i = 0; i < size; i++) {
            row = column = true
            for (let j = 0; j < size; j++) {
                if (areaState[i][i] !== marker) {
                    mainDiag = false
                }
                if (areaState[i][size - i - 1] !== marker) {
                    subDiag = false
                }
                if (areaState[i][j] !== marker) {
                    row = false
                }
                if (areaState[j][i] !== marker) {
                    column = false
                }
            }
            if (row || column) { setWinner(gamer) }
        }

        winTest = (mainDiag || subDiag || row || column)
        if (winTest) { setWinner(gamer) }
    }

    let pushItem = (rowPos, cloumnPos) => {
        let newAreaState = areaState
        if (!(areaState[rowPos][cloumnPos]) && !winner) {
            newAreaState[rowPos][cloumnPos] = (currentPos ? 'X' : 'O')
        }
        setCurrentPos(!currentPos)
        setAreaState(newAreaState)
        winnerTest()
    }

    let areaCleaner = (caliber) => {
        setSize(caliber)
        let newAreaState = []
        for (let i = 0; i < caliber; i++) {
            newAreaState.push(Array(caliber).fill(0));
        }
        setAreaState(newAreaState)
        setWinner('')
        setCurrentPos(true)
        console.log(areaState)
    }

    let Box = (props) => {
        return <div className={s.box}
            onClick={() => pushItem(props.rowPos, props.cloumnPos)}>
            {areaState[props.rowPos][props.cloumnPos] === 'X' && <img className={s.icon} src={krest} alt={'krest'} />}
            {areaState[props.rowPos][props.cloumnPos] === 'O' && <img className={s.icon} src={nolik} alt={'krest'} />}
        </div>
    }

    let rowBuilder = (rowNumber) => {
        let row = []
        for (let i = 0; i < size; i++) {
            row.push(<Box rowPos={rowNumber} cloumnPos={i} />)
        }
        return <div className={s.row}>{row.map(item => item)}</div>
    }

    let areaRender = () => {
        let area = []

        for (let i = 0; i < size; i++) {
            area.push(rowBuilder(i))
        }
        return area
    }

    return <div className={s.area__wrapper}>
        <div className={s.button__wrapper}><button onClick={() => areaCleaner(3)}>3х3</button><button onClick={() => areaCleaner(4)}>4х4</button></div>
        <div className={s.area}>
            {winner && <div className={s.area__shadow} onClick={() => areaCleaner(size)}>
                <div className={s.winner__info}>
                    <img src={winner === 'Крестики' ? krest : nolik} alt="winner" className={s.winner__pic} />
                    <span className={s.winner__text}>WIN!!!</span></div>
            </div>}
            {areaRender().map(item => item)}
        </div>
        <div className={s.button__wrapper}>
            <button onClick={() => areaCleaner(size)}>Clear</button>
        </div>
    </div>
}

export default Xo