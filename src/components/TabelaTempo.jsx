
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(atividade, dia, hora) {
  return { atividade, dia, hora };
}

function addDurations(duration1, duration2) {
  const totalMinutes = duration1.minutes + duration2.minutes;
  const totalHours = duration1.hours + duration2.hours + Math.floor(totalMinutes / 60);
  const totalDays = duration1.days + duration2.days + Math.floor(totalHours / 24);

  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;
  const days = totalDays;
  return { days, hours, minutes };
}

function stringFormat(duration) {
  let format = { days: duration.days, hours: duration.hours < 10 ? `0${duration.hours}` : duration.hours, minutes: duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes }
  return format;
}



export default function TabelaTempo({ dataInicio, horaInicio, dataFim, horaFim, percentagem20, percentagem30 }) {

  const inicio = { days: 0, hours: parseInt(horaInicio.split(":")[0]), minutes: parseInt(horaInicio.split(":")[1]) }
  const duration30 = { days: percentagem30.getDay(), hours: percentagem30.getHours(), minutes: percentagem30.getMinutes() }
  const duration20 = { days: percentagem20.getDay(), hours: percentagem20.getHours(), minutes: percentagem20.getMinutes() }

  const analise = addDurations(inicio, duration30);
  const formMA = addDurations(analise, duration20);
  const decisMA = addDurations(formMA, duration30);
  const eleabOOP = addDurations(decisMA, duration20);



  const rows = [
    createData('Recepção da OOp do Esc Superior', dataInicio - inicio.days, stringFormat(inicio).hours + ":" + stringFormat(inicio).minutes),
    createData('Brifingue da Análise da Missão', dataInicio - analise.days, stringFormat(analise).hours + ":" + stringFormat(analise).minutes),
    createData('Brifingue da Formulação das M/A', dataInicio - formMA.days, stringFormat(formMA).hours + ":" + stringFormat(formMA).minutes),
    createData('Brifingue da Decisão', dataInicio - decisMA.days, stringFormat(decisMA).hours + ":" + stringFormat(decisMA).minutes),
    createData('Difusão da OOp', dataInicio - eleabOOP.days, stringFormat(eleabOOP).hours + ":" + stringFormat(eleabOOP).minutes),
    createData('Saída da ZRn ', dataFim, horaFim,),
    createData('Passagem da LP', 0, "00:00",),
  ];

  const marks = [
    {
      value: 0,
      label: 'D-'+dataInicio+" H+" +stringFormat(inicio).hours + ":" + stringFormat(inicio).minutes,
    },
    {
      value: 10,
      label: 'D-'+(dataInicio-analise.days)+" H+" +stringFormat(analise).hours + ":" + stringFormat(analise).minutes,
    },
    {
      value: 16.6667,
      label: 'D-'+ (dataInicio-formMA.days)+" H+" +stringFormat(formMA).hours + ":" + stringFormat(formMA).minutes,
    },
    {
      value: 26.6667,
      label: 'D-'+ (dataInicio-decisMA.days) +" H+" +stringFormat(decisMA).hours + ":" + stringFormat(decisMA).minutes,
    }, 
    {
      value: 33,
      label: 'D-'+ (dataInicio-eleabOOP.days) +" H+" +stringFormat(eleabOOP).hours + ":" + stringFormat(eleabOOP).minutes,
    }, 
    {
      value: 93.1,
      label: 'D-'+ (dataInicio-eleabOOP.days) +" H+" +stringFormat(eleabOOP).hours + ":" + stringFormat(eleabOOP).minutes,
    }, 
    {
      value: 100,
      label: 'D-0 H+00:00',
    },
  ];


  return (
    <>
    <div className='col-12 px-3 mb-5'>
      <Slider disabled defaultValue={33} aria-label="Default" valueLabelDisplay="auto" marks={marks} />
    </div>
      

      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell className='fw-bold text-light'>Dia</TableCell>
              <TableCell className='fw-bold text-light'>Hora</TableCell>
              <TableCell className='fw-bold text-light'>Atividade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  D - {row.dia}
                </TableCell>
                <TableCell>
                  H + {row.hora}
                </TableCell>
                <TableCell >{row.atividade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
}