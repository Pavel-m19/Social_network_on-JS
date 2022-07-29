import React from "react";
import { useState, useEffect } from "react";
import s from "./game.module.scss"

const Game = () => {

    let boxColors = {
        0: 'rgb(216, 211, 206)',
        2: 'rgb(240, 228, 217)',
        4: 'rgb(238, 225, 199)',
        8: "rgb(253, 175, 112)",
        16: "rgb(255, 143, 86)",
        32: "rgb(255, 112, 80)",
        64: "rgb(255, 70, 18)",
        128: "rgb(241, 210, 104)",
        256: "rgb(241, 208, 86)",
        512: "rgb(240, 203, 65)",
        1024: "rgb(242, 201, 39)",
        2048: "rgb(243, 197, 0 )",
        4096: "rgb(255, 80, 75)",
        8192: "rgb(255, 34, 75)",
        16384: "rgb(248, 19, 30)",
        32768: "rgb(96, 178, 219)",
        65536: "rgb(83, 154, 229)",
        131072: "rgb(0, 118, 193)",
    }

    let [areaState, setAreaState] = useState([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])

    //вспомогательные мини функции
    const randomizePos = () =>{
        return Math.round(Math.random()*3)
    }
    const randomSpawner = () =>{
        if(Math.random() < 0.8){
            return 2                               
        } else {
            return 4
        }    
    }

    //запуск игры

    let gameStrarter = () => {
        console.log(1)
        let newAreaState = areaState.map(function (item) {
            return [...item]
        })        
        for (let i = 0; i < 3; i++){
            let x = randomizePos()
            let y = randomizePos()
            newAreaState[x][y] = randomSpawner()
                    
        }
        setAreaState(newAreaState)
    }

    //вставка нового значения

    let inserter = (newAreaState) => {        
        let flag = true
        while(flag){
            let x = randomizePos()
            let y = randomizePos()
            if(newAreaState[x][y] === 0){                
                newAreaState[x][y] = randomSpawner()
                flag = false                
            }
        } 
        return newAreaState    
    }

    //действия по кнопкам

    let mover = (e) => {
        const zeroDeleter = (array) => {
            return array.filter(el => el !== 0)
        }
        let newAreaState = []

        if (e.code === 'ArrowLeft') {
            e.preventDefault()
            for (let i = 0; i < 4; i++) {
                let currentLine = zeroDeleter(areaState[i])

                for (let j = 0; j < currentLine.length - 1; j++) {

                    if (currentLine[j] === currentLine[j + 1]) {
                        currentLine[j] = currentLine[j] * 2
                        currentLine[j + 1] = 0
                    }
                }

                currentLine = zeroDeleter(currentLine)

                for (let j = currentLine.length - 1; j < 3; j++) {
                    currentLine.push(0)
                }
                newAreaState.push(currentLine)
            }
        }

        if (e.code === 'ArrowRight') {
            e.preventDefault();
            for (let i = 0; i < 4; i++) {
                let currentLine = zeroDeleter(areaState[i])

                for (let j = currentLine.length - 1; j > 0;) {

                    if (currentLine[j] === currentLine[j - 1]) {
                        currentLine[j] = currentLine[j] * 2
                        currentLine[j - 1] = 0
                    }
                    j -= 1
                }

                currentLine = zeroDeleter(currentLine)

                for (let j = currentLine.length - 1; j < 3; j++) {
                    currentLine.unshift(0)
                }
                newAreaState.push(currentLine)
            }
        }

        if (e.code === 'ArrowUp') {
            e.preventDefault();
            newAreaState = areaState.map(function (item) {
                return [...item]
            })
            for (let i = 0; i < 4; i++) {

                let currentColumn = []
                for (let k = 0; k < 4; k++) {
                    currentColumn.push(newAreaState[k][i])
                }   
                
                currentColumn = zeroDeleter(currentColumn)

                for (let j = currentColumn.length - 1; j > 0;) {
                    if (currentColumn[j] === currentColumn[j - 1]) {
                        currentColumn[j] = currentColumn[j] * 2
                        currentColumn[j - 1] = 0
                    }
                    j -= 1
                }

                currentColumn = zeroDeleter(currentColumn)

                for (let j = currentColumn.length - 1; j < 3; j++) {
                    currentColumn.push(0)
                }


                for (let k = 0; k < 4; k++) {
                    newAreaState[k][i] = currentColumn[k]
                }
            }
        }

        if (e.code === 'ArrowDown') {
            e.preventDefault();
            newAreaState = areaState.map(function (item) {
                return [...item]
            })
            for (let i = 0; i < 4; i++) {

                let currentColumn = []
                for (let k = 0; k < 4; k++) {
                    currentColumn.push(areaState[k][i])
                }

                currentColumn = zeroDeleter(currentColumn)

                for (let j = 0; j < currentColumn.length - 1; j++) {
                    if (currentColumn[j] === currentColumn[j + 1]) {
                        currentColumn[j] = currentColumn[j] * 2
                        currentColumn[j + 1] = 0
                    }
                }

                currentColumn = zeroDeleter(currentColumn)

                for (let j = currentColumn.length - 1; j < 3; j++) {
                    currentColumn.unshift(0)
                }


                for (let k = 0; k < 4; k++) {
                    newAreaState[k][i] = currentColumn[k]
                }
            }
        }

        setAreaState(inserter(newAreaState));
        
    }


    let Box = ({ rowPos, cloumnPos }) => {
        let currentBox = areaState[rowPos][cloumnPos]
        let textSize = "35px"
        let textColor = 'rgb(119,110,100)'

        if (currentBox > 999) { textSize = "30px" }
        if (currentBox > 9999) { textSize = "25px" }
        if (currentBox > 99999) { textSize = "20px" }

        if (currentBox > 7) { textColor = 'rgb(250,246,243)' }



        return <div className={s.box}>
            <div className={s.inner_box}
                style={{
                    '--back': boxColors[currentBox],
                    '--fontSize': textSize,
                    '--textColor': textColor
                }}>
                {currentBox ? currentBox : ''}
            </div>
        </div>
    }

    let rowBuilder = (rowNumber) => {
        let row = []
        for (let i = 0; i < 4; i++) {
            row.push(<Box rowPos={rowNumber} cloumnPos={i} />)
        }
        return <div className={s.row}>{row.map(item => item)}</div>
    }

    let areaRender = () => {
        let area = []

        for (let i = 0; i < 4; i++) {
            area.push(rowBuilder(i))
        }
        return area
    }

    useEffect(() => {
        document.body.addEventListener('keydown', mover)
        return () => { document.body.removeEventListener('keydown', mover) }

    })



    return <div className={s.game_wrapper}>
        {areaRender().map(item => item)}
        <div className={s.button_wrapper}>
            <button onClick={() => gameStrarter()}>start</button>
        </div>
    </div>
}

export default Game