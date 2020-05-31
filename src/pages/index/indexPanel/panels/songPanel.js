import React, { useEffect, useState } from 'react'

import '../../../../styles/songPanel.scss'

const SongPanel = () => {

    useEffect( () => generateTitleCode() )
    useEffect( () => setTextHeight() )

    const [openDescription, setOpen] = useState(-1)

    // ANSI: ▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏░▒▓▐▔▕▖▗▘▙▚▛▜▝▞▟

    let title = 'rzukk x bragga bad'
    let address = '/op?song=aQ2ed#!WkL#csd435fk'
    let code = ''

    const generateTitleCode = () => {
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

    const setTextHeight = () => {
        let titleDivHeight = document.getElementById('songDetails').clientHeight
        let textDivHeight = window.innerHeight - titleDivHeight
        document.getElementById('songText').style = 'height: ' + (textDivHeight - 50) + 'px;'
    }

    let exampleText = [
        '[Zwrotka Rzukk]\n',
        'Znam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\n[Zwrotka Rzukk]\n',
        'Znam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n',

        '\nZnam wielu co robią zajebistą muzykę, kolego,\n',
        'Nie znam ani jednego, z kogo zrobiłaby zajebistego,\n',
        'Ludzie płyną z nurtem, bo fajne, bo modne,\n',
        'Leczą swe komplexy, rozmieniają się na drobne,\n'
    ]

    let exampleRowDetails = {
        1: {
            group: false,
            leader: true,
            text: 'Znam wielu co robią',
            description: 'chodzi o to, że ktoś coś robi, itpchodzi o to, że ktoś coś robi, itpchodzi o to, że ktoś coś robi, itp',
            image: ''
        },
        4: {
            group: false,
            leader: true,
            text: 'rozmieniają się na drobne',
            description: 'leczą no wszystko jasne leczą no wszystko jasne leczą no wszystko jasne leczą no wszystko jasne leczą no wszystko jasne',
            image: ''
        },
        14: {
            group: true,
            leader: false,
            link: 16,
            text: ''
        },
        15: {
            group: true,
            leader: false,
            link: 16,
            text: ''
        },
        16: {
            group: true,
            leader: true,
            text: '',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
            image: ''
        }
    }

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
                        { exampleText.map( (row, key) => {
                                    
                                    const textHighlight = (text, mark) => {
                                        let markRow = text.replace(RegExp(mark, 'g'), '<pre class="textHighlights">' + mark + '</pre>')
                                        return { __html: markRow }
                                    }
                                    if(exampleRowDetails[key] !== undefined) {
                                        if (exampleRowDetails[key].group === false && exampleRowDetails[key].leader === true){
                                            return (
                                                <div>
                                                    <pre 
                                                        id={'row' + key} 
                                                        className='generalText'
                                                        onClick={ openDescription === key ? () => setOpen( -1 ) : () => setOpen( key )}
                                                        dangerouslySetInnerHTML={ textHighlight(row, exampleRowDetails[key].text) }>
                                                    </pre>
                                                    <pre 
                                                        id={'description' + key} 
                                                        className={ openDescription === key ? 'rowDetails rowDetailsOpen' : 'rowDetails'}>
                                                            {exampleRowDetails[key].description}
                                                    </pre>
                                                </div>
                                            )
                                        }
                                        else if (exampleRowDetails[key].group === true && exampleRowDetails[key].leader === false) {
                                            let link = exampleRowDetails[key].link
                                            let text = exampleRowDetails[key].text
                                            return (
                                                <div>
                                                    <pre 
                                                        id={'row' + key} 
                                                        className='generalText'
                                                        onClick={ openDescription === link ? () => setOpen( -1 ) : () => setOpen( link )}
                                                        dangerouslySetInnerHTML={ text === '' ? textHighlight(row, row) : textHighlight(row, text) }>
                                                    </pre>
                                                </div>
                                            )
                                        }
                                        else if (exampleRowDetails[key].group === true && exampleRowDetails[key].leader === true) {
                                            let text = exampleRowDetails[key].text
                                            return (
                                                <div>
                                                    <pre 
                                                        id={'row' + key} 
                                                        className='generalText'
                                                        onClick={ openDescription === key ? () => setOpen( -1 ) : () => setOpen( key )}
                                                        dangerouslySetInnerHTML={ text === '' ? textHighlight(row, row) : textHighlight(row, text) }>
                                                    </pre>
                                                    <pre 
                                                        id={'description' + key} 
                                                        className={ openDescription === key ? 'rowDetails rowDetailsOpen' : 'rowDetails'}>
                                                            {exampleRowDetails[key].description}
                                                    </pre>
                                                </div>
                                            )
                                        }
                                    }
                                    else
                                        return (
                                            <pre id={key} className='generalText'>
                                                {row}
                                            </pre>
                                        )
                                }
                            ) 
                        }
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