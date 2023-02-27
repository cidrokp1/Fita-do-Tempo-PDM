
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import TabelaTempo from './TabelaTempo';

function FitaDoTempo() {
    const [dataInicio, setDataInicio] = useState(0);
    const [horaInicio, setHoraInicio] = useState("00:00");
    const [dataFim, setDataFim] = useState(0);
    const [horaFim, setHoraFim] = useState("00:00");

    const [totalTime, setTotalTime] = useState(new Date(0, 0, 0));
    const [totalTercoTime, setTotalTercoTime] = useState(new Date(0, 0, 0));
    const [percentagem20, setPercentagem20] = useState(new Date(0, 0, 0));
    const [percentagem30, setPercentagem30] = useState(new Date(0, 0, 0));


 


    const tempoTotal = () => {

        return (<div className='d-flex flex-column flex-start'>
            <div> <strong>Total : </strong>
                {dataInicio && dataFim &&
                    <>
                        {totalTime.getDay() > 0 && <>{totalTime.getDay() + " dia(s) "}</>}
                        {totalTime.getHours()} hora(s) e {totalTime.getMinutes()} min
                    </>
                }
            </div>
            <hr></hr>
            <div>
                <strong>Total (1/3): </strong>
                {dataInicio && dataFim &&
                    <> 
                        {totalTercoTime.getDay() > 0 && <>{totalTercoTime.getDay() + " dia(s) "}</>}
                        {totalTercoTime.getHours()} hora(s) e {totalTercoTime.getMinutes()} min
                    </>
                }
            </div>
            <div>
                <strong>20% : </strong>
                {dataInicio && dataFim &&
                    <>
                        {percentagem20.getDay() > 0 && <>{percentagem20.getDay()}dia(s) </>}
                        {" " + percentagem20.getHours() + " Horas(s) e " + percentagem20.getMinutes() + " min"}
                    </>
                }


            </div>
            <div>
                <strong>30% : </strong>
                {dataInicio && dataFim &&
                    <>
                        {percentagem30.getDay() > 0 && <>{percentagem30.getDay()}dia(s)</>}
                        {" " + percentagem30.getHours() + " Horas(s) e " + percentagem30.getMinutes() + " min"}
                    </>
                }
            </div>
            {/* <div> <strong>30% : </strong> {Math.round(percento30) + "Dia(s) e " + Math.round((percento30*24-24)) + " Hora(s)"}</div> */}
        </div>);
    }



    useEffect(() => {
        let DateTimeInicio = new Date(0, 0, 0, horaInicio.split(":")[0], horaInicio.split(":")[1]);
        let DateTimeFim = new Date(0, 0, 0, horaFim.split(":")[0], horaFim.split(":")[1]);


        let HourSubstraction = DateTimeFim.getTime() - DateTimeInicio.getTime();
        let DiasSubtraction = (dataInicio - dataFim) * 24 * 3600000;
        let total = HourSubstraction + DiasSubtraction;
        let totalTerco = (1 / 3) * total


        let dateTimeTotal = new Date(0, 0, 0, 0, 0, 0, total);
        let dateTimeTotalTerco = new Date(0, 0, 0, 0, 0, 0, totalTerco);
        let dateTime20 = new Date(0, 0, 0, 0, 0, 0, 0.2 * (1 / 3) * total);
        let dateTime30 = new Date(0, 0, 0, 0, 0, 0, 0.3 * (1 / 3) * total);

        setTotalTime(dateTimeTotal)
        setTotalTercoTime(dateTimeTotalTerco)
        setPercentagem20(dateTime20)
        setPercentagem30(dateTime30)

    }, [dataInicio, horaInicio, dataFim, horaFim]);



    return (
        <div className='bg-white text-dark shadow rounded p-4 d-flex flex-column text-center'>
            <h2 >Processo de Decisão Militar</h2>
            <h5 >Fita do Tempo</h5>
            <div className="row py-5 d-flex justify-content-center">
                <div className="col-12 col-md-4 mb-5 text-start">
                    <div className='mb-3 fw-bold'> Recepção da OOP</div>
                    <hr></hr>
                    <div className="d-flex flex-start">
                        <strong className='my-3 h5'>D-</strong>
                        <TextField id="outlined-basic" label="Dia" type={'number'} style={{ "width": "80px" }}
                            onChange={(e) => setDataInicio(e.target.value)} variant="outlined" className='mx-2' />
                        <strong className='my-3 h5'>H+</strong>
                        <TextField id="outlined-basic" type={'time'}
                            onChange={(e) => setHoraInicio(e.target.value)} variant="outlined" className='mx-2' />
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-5 text-start">
                    <div className='mb-3 fw-bold'>Fim de Planeamento / Saída da ZRn</div>
                    <hr></hr>
                    <div className="d-flex flex-start">
                        <strong className='my-3 h5'>D-</strong>
                        <TextField id="outlined-basic" label="Dia"
                            value={dataFim}
                            onChange={(e) => {parseInt(e.target.value) <= parseInt(dataInicio) && parseInt(e.target.value) >=0 ? setDataFim(e.target.value) : setDataFim(dataInicio) }} type={'number'} style={{ "width": "80px" }}
                            variant="outlined" className='mx-2' />
                        <strong className='my-3 h5'>H+</strong>
                        <TextField id="outlined-basic"
                            onChange={(e) => setHoraFim(e.target.value)} type={'time'}
                            variant="outlined" className='mx-2' />
                    </div>
                </div>
                <div className="col-12 col-md-4  d-flex  text-start">
                    <div>
                        {/* <strong>Tempo total :</strong> */}
                        <div className=''>
                            {tempoTotal()}
                        </div>

                    </div>
                </div>
            </div>

           
            <div className='row py-3 d-flex justify-content-center'>
                <div className='col'>
                    <TabelaTempo percentagem20={percentagem20} percentagem30={percentagem30} dataInicio={dataInicio} horaInicio={horaInicio} dataFim={dataFim} horaFim={horaFim} />
                </div>
                {/* <div className='col'>
                    <TabelaTempo />
                </div> */}
            </div>


        </div>
    );
}

export default FitaDoTempo;
