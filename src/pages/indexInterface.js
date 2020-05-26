import React, { useState, useEffect } from 'react'

import '../styles/audioVisualizer.scss'
import audioTest from '../images/audioTest.mp3'

const IndexInterface = () => {

    const [play, setPlay] = useState(false)
    const [pause, setPause] = useState(false)

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const controlAudio = () => {
        if (play === false) {
            setPlay(!play)
            playAudio()
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

    const playAudio = () => {

        let audio = document.getElementById("audio");
        audio.src = audioTest;
        audio.load();
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
        console.log(bufferLength);

        let dataArray = new Uint8Array(bufferLength);

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        let frameString = '==================================================='

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

            timerAudio(audio)

            for (let i = 0; i < bufferLength; i++) {

                barHeight = dataArray[i];

                let r = barHeight + (25 * (i / bufferLength));
                let g = 36;     //250 * ( i / bufferLength);
                let b = 36;

                ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                ctx.font = '15px Ubuntu'
                frame = frameString.slice(0, barHeight / 10) + '='
                ctx.fillText(frame, 0, x);

                x += barWidth - 27;
            }
        }
        const timerAudio = (audio) => {
            let maxMinutes = parseInt(audio.duration / 60)
            let maxSeconds = parseInt(audio.duration - (60 * maxMinutes))

            let seconds = parseInt(audio.currentTime);
            let minutes = parseInt(seconds / 60);
            if (minutes > 0) {
                seconds = parseInt(seconds - (60 * minutes))
            }
            document.getElementById('audioCurrentTime').innerHTML = minutes
                + ':'
                + seconds
            document.getElementById('audioTime').innerHTML = maxMinutes
                + ':'
                + maxSeconds
        }
        const progressBarAudio = (audio) => {
            let maxProgress = audio.duration
            let onePercent = maxProgress / 100
            let progress = 1;
            for(let i = 0; i <= 100; i++) {
                let bar = document.getElementById('audioProgressBar').innerHTML
                document.getElementById('audioProgressBar').innerHTML = bar.replace('|', '#')
                console.log(i)
                sleep(parseInt((onePercent * 1000) * 5))
            }
            
        }

        audio.play();
        renderFrame();
        progressBarAudio(audio)
    }

    return (
        <div id='audioVisualizerDiv'>
            <div id='audioMenu'>
                <div onClick={controlAudio}>
                    {play === false || pause === true ? '>' : '||'}
                </div>
                <div id='audioCurrentTime' >
                    0:0
                </div>
                <div>===</div>
                <div id='audioProgressBar'>
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                    | <br />
                </div>
                <div>===</div>
                <div id='audioTime'>
                    0:0
                </div>
            </div>
            <canvas id='canvas'>
            </canvas>
            <audio id='audio' controls>
            </audio>
        </div>
    )

}
export default IndexInterface