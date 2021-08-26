import {useState, useEffect} from 'react'
import './index.css'

function App() {

    // StopWatch states
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [startDisabled, setStart] = useState(false)
    const [interval, setMyInterval] = useState('')

    // Timer functions
    const [hourTimer, setHourTimer] = useState(0)
    const [minuteTimer, setMinuteTimer] = useState(0)
    const [secondTimer, setSecondTimer] = useState(0)
    const [status, setStatus] = useState(false)
    const [intervalTimer, setMyIntervalTimer] = useState('')

    // StopWatch functions
    useEffect(() => {
        if (minute === 60) {
            setHour(prev => prev + 1)
            setMinute(0)
            setSecond(0)
        }
    }, [minute])

    useEffect(() => {
        if (second === 60) {
            setMinute(prev => prev + 1)
            setSecond(0)
        }
    }, [second])

    useEffect(() => {
        if (startDisabled) {
            let int = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000)
            setMyInterval(int)
        }
    }, [startDisabled])

    function startButtonClicked() {
        setStart(true)
    }

    function onStopClicked() {
        clearInterval(interval)
        setStart(false)
    }

    function onClearClicked() {
        onStopClicked()
        setSecond(0)
        setMinute(0)
        setHour(0)
        setStart(false)
    }

    // Timer functions
    function changeStatus() {
        setStatus(true)
    }

    useEffect(() => {
        if (status) {
            let int = setInterval(() => {
                setSecondTimer(prev => prev - 1)
            }, 1000)
            setMyIntervalTimer(int)
        }
    }, [status])

    useEffect(() => {
        if (secondTimer === -1) {
            setMinuteTimer(prev => prev - 1)
            setSecondTimer(59)
        }
    }, [secondTimer])

    useEffect(() => {
        if (minuteTimer === -1) {
            setHourTimer(prev => prev - 1)
            setMinuteTimer(59)
            setSecondTimer(59)
        }
    }, [minuteTimer])

    function clearTimer() {
        pauseTimer()
        setSecondTimer(0)
        setMinuteTimer(0)
        setHourTimer(0)
    }

    function pauseTimer() {
        clearInterval(intervalTimer)
        setStatus(false)
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row text-center">
                    <div className="col-md-6 offset-3">
                        <div className="card">
                            <div className="card-header">
                                <h1 className={'text-center'}>StopWatch</h1>
                            </div>
                            <div className="card-body">
                                <h3 className={'text-center'}>{hour}:{minute}:{second}</h3>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-3">
                                        <button className={"btn btn-success mx-5"} onClick={startButtonClicked}
                                                disabled={startDisabled}>Start
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className={"btn btn-warning mx-5"} onClick={onStopClicked}
                                                disabled={!startDisabled}>Stop
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className={"btn btn-danger mx-5"} onClick={onClearClicked}
                                                disabled={!startDisabled}>Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Timer*/}
                <div className="row mt-5 bg-dark text-white p-5 rounded">
                    <div className="col-md-12 text-center">
                        <h1 className={'mt-5'}>Timer</h1>
                        <div className="row">
                            <div className="col-md-12 d-flex">
                                <div className={'hour'}>Hours</div>
                                <div className={'min'}>Minutes</div>
                                <div className={'sec'}>Seconds</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex">
                                <div className={'hour'}>
                                    <div><input type="number" placeholder={hourTimer}
                                                onChange={(e) => setHourTimer(e.target.value)}/></div>
                                    <h5 className={"text-warning"}>remained hour: {hourTimer}</h5>
                                </div>
                                <div className={'min'}>
                                    <div><input type="number" placeholder={minuteTimer}
                                                onChange={(e) => setMinuteTimer(e.target.value)}/></div>
                                    <h5 className={"text-warning"}>remained minute: {minuteTimer}</h5>
                                </div>
                                <div className={'sec'}>
                                    <div><input type="number" placeholder={secondTimer}
                                                onChange={(e) => setSecondTimer(e.target.value)}/></div>
                                    <h5 className={"text-warning"}>remained second: {secondTimer}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <button className={'btn btn-success'} disabled={status}
                                        onClick={changeStatus}>Start
                                </button>
                                <button className={'btn btn-info mx-5'} disabled={!status}
                                        onClick={pauseTimer}>Pause
                                </button>
                                <button className={'btn btn-danger'} disabled={!status}
                                        onClick={clearTimer}>Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
