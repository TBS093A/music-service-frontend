import React, { useState, useEffect } from 'react'

import '../../../styles/audioVisualizer.scss'
import { alphabeth } from '../../../components/alphabeth'
import audioTest from '../../../images/audioTest.mp3'


const AudioPlayer = () => {

    const [play, setPlay] = useState(false)
    const [pause, setPause] = useState(false)

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => loadAudio(), [])

    const loadAudio = () => {
        let audio = document.getElementById("audio");
        audio.src = audioTest;
        audio.load();
    }

    const controlAudio = async () => {
        if (play === false) {
            setPlay(!play)
            await playAudio()
        }
        else if (play === true && pause === false) {
            setPause(!pause)
            pauseAudio()
        }
        else if (play === true && pause === true) {
            setPause(!pause)
            resumeAudio()
        }
    }

    const pauseAudio = () => {
        let audio = document.getElementById("audio");
        audio.pause()
    }

    const resumeAudio = () => {
        let audio = document.getElementById("audio");
        audio.play()
    }

    const playAudio = async () => {

        let audio = document.getElementById("audio");
        // audio.src = audioTest;
        // audio.load();
        audio.play();
        let context = new AudioContext();
        let src = context.createMediaElementSource(audio);
        let analyser = context.createAnalyser();

        let canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        let bufferLength = analyser.frequencyBinCount;

        let dataArray = new Uint8Array(bufferLength);

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        //let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        let frameString = '===================================================='

        let frameStrings = [] // 52 chars in row

        for (let i = 0; i <= 200; i++) {
            frameStrings[i] = Math.random().toString(36)
                + ""
                + Math.random().toString(36)
                + ""
                + Math.random().toString(36)
                + ""
                + Math.random().toString(36);
        }

        let frame

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            timerAudio()

            for (let i = 0; i < bufferLength; i++) {

                barHeight = dataArray[i];

                let r = barHeight + (25 * (i / bufferLength));
                let g = 36;     //250 * ( i / bufferLength);
                let b = 36;

                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                ctx.font = '15px Ubuntu'
                frame = frameString.slice(0, barHeight / 10) + '='
                ctx.fillText(frame, 0, x);
                
                x += window.innerHeight / (bufferLength - 34);
            }
        }
        const timerAudio = () => {
            let maxMinutes = parseInt(audio.duration / 60)
            let maxSeconds = parseInt(audio.duration - (60 * maxMinutes))

            let seconds = parseInt(audio.currentTime);
            let minutes = parseInt(seconds / 60);
            if (minutes > 0) {
                seconds = parseInt(seconds - (60 * minutes))
            }
            document.getElementById('audioCurrentTime').innerHTML = minutes
                + ':'
                + (seconds < 10 ? '0' : '')
                + seconds
            document.getElementById('audioTime').innerHTML = maxMinutes
                + ':'
                + (maxSeconds < 10 ? '0' : '')
                + maxSeconds
        }
        const progressBarAudio = async () => {
            await sleep(1000)
            let maxProgress = audio.duration
            let onePercent = maxProgress / 100
            let progress = 1
            let lastProgressValue = 0;
            while (progress <= 20) {
                await sleep(5000 * onePercent)
                let bar = document.getElementById('audioProgressBar').innerHTML
                progress = parseInt((audio.currentTime / onePercent) / 5);
                if (lastProgressValue !== progress) {
                    document.getElementById('audioProgressBar').innerHTML = bar.replace('|', '#')
                    lastProgressValue = progress
                }
            }
        }    

        audio.play()
        renderFrame()
        await viewTitleAudio()
        moveTitleAudio()
        await progressBarAudio()
    }

    const barClick = (e) => {
        e.preventDefault()
        let rect = e.target.getBoundingClientRect()
        let y = e.clientY - rect.top
        let value = parseInt((y / 364) * 100)
        let audio = document.getElementById("audio");
        let maxProgress = audio.duration
        let onePercent = maxProgress / 100
        audio.currentTime = value * onePercent
        let progress = parseInt(value / 5)
        let i = 0
        while (i < 20) {
            let bar = document.getElementById('audioProgressBar').innerHTML
            document.getElementById('audioProgressBar').innerHTML = bar.replace('#', '|')
            i++
        }
        i = 0
        while (i <= progress) {
            let bar = document.getElementById('audioProgressBar').innerHTML
            document.getElementById('audioProgressBar').innerHTML = bar.replace('|', '#')
            i++
        }

    }

    const viewTitleAudio = async() => {
        let title = 'rzukk x bragga bad'
        title = title.toUpperCase()
        let titleASCII = [];
        let i
        for (i = 0; i < title.length; i++) {
            titleASCII[i] = alphabeth[title[i]]
            titleASCII[i] += '\n'
            titleASCII[i].replace(',', '')
        }
        let titleASCIIFull = titleASCII.toString()
        while (i > 0) {
            titleASCIIFull = titleASCIIFull.replace(',','')
            i--
        }
        document.getElementById('audioTitle').innerText = titleASCIIFull
    }

    const moveTitleAudio = async() => {
        let title = document.getElementById('audioTitle')
        let different = window.innerHeight - title.clientHeight
        await sleep(5000)
        while (true) {
            title.style = 'margin-top: ' + different + 'px;'
            await sleep(15000)
            title.style = 'margin-top: 10px;'
            await sleep(15000)
        }
    }

    return (
        <div id='audioVisualizerDiv'>
            <div id='audioMenu'>
                <div onClick={controlAudio}>
                    {play === false || pause === true ? '>' : '||'}
                </div>
                <div id='audioCurrentTime' >
                    0:00
                </div>
                <div>===</div>
                <div id='audioProgressBar' onClick={e => barClick(e)} onDrag={e => barClick(e)}>
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                    |<br />
                </div>
                <div>===</div>
                <div id='audioTime'>
                    0:00
                </div>
            </div>
            <canvas id='canvas'>
            </canvas>
            <pre id='audioTitle'>
            </pre>
            <audio id='audio'>
            </audio>
        </div>
    )

}
export default AudioPlayer