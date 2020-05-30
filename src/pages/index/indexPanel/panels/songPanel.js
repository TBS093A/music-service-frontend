import React, { useEffect } from 'react'

import '../../../../styles/songPanel.scss'

const SongPanel = () => {

    useEffect( () => generateTitleCode())

    let title = 'rzukk x bragga bad'
    let address = '/op?song=aQ2ed#!WkL#csd435fk'
    let code = ''

    const generateTitleCode = () => {
        //let randomChars = '▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏░▒▓▐▔▕▖▗▘▙▚▛▜▝▞▟'
        let randomChars = '░▒'
        let charInRowCount = parseInt((document.getElementById('songCode').clientWidth) / 10) - 6
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < charInRowCount; j++) {
                if (j === 0)
                    code += ' ▎▍▏▍▏'
                else
                    code += randomChars[parseInt(Math.random() * randomChars.length)]
            }
            code += '<br />'
        }
        document.getElementById('songCode').innerHTML = code
    }

    let exampleText = 'Znam wielu co robią zajebistą muzykę, kolego,\n'
        + 'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n'
        + 'Ludzie płyną z nurtem, bo fajne, bo modne,\n'
        + 'Leczą swe komplexy, rozmieniają się na drobne,\n'

    return (
        <div id='songPanel'>
            <div className='songPanelColumn'>
                <div id='songDetails'>
                    <div id='songCode'>
                    </div>
                    <div id='songThings'>
                        <div id='songTitle'>
                            {title}
                        </div>
                        <div id='songAddress'>
                            {address}
                        </div>
                    </div>
                </div>
                <div id='songText'>
                    <div className='textSection'>
                        <pre className='generalText'>
                            { exampleText }
                        </pre>
                        <div className='rowDetails'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='songPanelColumn'>
                <div id='songComments'>
                </div>
                <div id='albumSongs'>
                </div>
            </div>
        </div>
    )
}
export default SongPanel