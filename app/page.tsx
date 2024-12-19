'use client';
import next from 'next';
import {useState} from 'react'

const basicKnowledges : {
  [indexer : string] : string[]
} = {
  Tuna : ['B1', 'B4', 'B15', 'B19'],
  Hiu : ['B2', 'B4', 'B6', 'B14'],
  Barakuda : ['B3', 'B13', 'B14'],
  ClownFish : ['B5', 'B16', 'B17'],
  Marlin : ['B4', 'B6', 'B7', 'B15', 'B19'],
  Sarden : ['B6', 'B15', 'B19'],
  Napoleon : ['B4', 'B8', 'B18', 'B21'],
  Kerapu : ['B3', 'B4', 'B9', 'B10', 'B20'],
  Pari : ['B3', 'B11', 'B19'],
  Bawal : ['B12', 'B14', 'B15']
}

const questions : {
  [indexer : string] : string
} = {
  'B1' : "Apakah tubuh ikan berbentuk cerutu menyerupai torpedo?",
  'B2' : "Apakah ikan memiliki tubuh yang ramping?",
  'B3' : "Apakah ikan berkemampuan untuk beradaptasi dengan suhu air yang berfluktuasi?",
  'B4' : "Apakah tubuh ikan berukuran besar?",
  'B5' : "Apakah ikan memiliki tubuh yang lonjong?",
  'B6' : "Apakah ikan memiliki tubuh yang memanjang?",
  'B7' : "Apakah ikan memiliki tombak bundar yang memanjang di moncongnya?",
  'B8' : "Apakah ikan berbibir tebal?",
  'B9' : "Apakah ikan bermulut lebar?",
  'B10': "Apakah ikan berbadan kekar dan berotot?",
  'B11' : "Apakah ikan bertubuh gepeng dan lebar?",
  'B12' : "Apakah tubuh ikan berbentuk oval & pipih?",
  'B13' : "Apakah ikan memiliki warna cokelat?",
  'B14' : "Apakah ikan memiliki warna abu-abu?",
  'B15' : "Apakah ikan memiliki warna putih-keperakan?",
  'B16' : "Apakah ikan memiliki warna oranye?",
  'B17' : "Apakah ikan memiliki garis-garis putih di tubuhnya?",
  'B18' : "Apakah ikan memiiliki warna hijau?",
  'B19' : "Apakah ikan memiliki warna biru gelap hingga hitam?",
  'B20' : "Apakah ikan memiliki bintik-bintik pada tubuhnya?",
  'B21' : "Apakah ikan memiliki warna biru?"
}

const yesAnswers : string[] = [];
const noAnswers : string[] = [];
const answered : string[] = [];


export default function Home() {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [result, setResult] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [gotcha, setGotcha] = useState<string | null>(null);

  let question = "";

  if (gotcha === null) {

  if (result.length === 0) {
    question = questions[`B${questionNumber}`];
  }

  if (result!.length !== 0 && summary === null) {
    let scores = new Array(Object.keys(basicKnowledges).length).fill(0);
    let totalScores = 0;
    let ok = false;
    for (const answer of yesAnswers) {
      if (!ok) {
      let i = 0;
      for (const key in basicKnowledges) {
        if(basicKnowledges[key].includes(answer) && !ok) {
        ++scores[i];
        ++totalScores;
        if (basicKnowledges[key].length === scores[i]) {
          ok = true;
          setSummary(`Dari ciri-ciri yang diberikan, jenis ikan yang dimaksud adalah : ${key}`);
          setResult([]);
          break;
        }
        }
        ++i;
      }}
    }

    console.log(scores);
      if (!ok) {
      let score = 0;

      if (scores.length !== 0){
      setSummary("Berikut adalah hasil inferensi dari data yang anda berikan : ")
      const temp = [];
      for (const key in basicKnowledges) {
        const percentage = (scores[score] / totalScores) * 100;
        temp.push(`${key} = ${percentage}%`);
        ++score;
      }
      setResult(temp);
    }
  }
  }
}

  async function onClick(answer : string) {
    if (gotcha === null) {
    const maxQuestionNumber = Object.keys(questions).length;
    let nextQuestion : number | undefined = (questionNumber+1);
    if (questionNumber !== maxQuestionNumber) {
      answered.push(`B${questionNumber}`);
      if (answer === "yes") {
        yesAnswers.push(`B${questionNumber}`);

        for (const key in basicKnowledges) {
          let counter = 0;
          for (const yesAnswer of yesAnswers) {
            if (basicKnowledges[key][counter] === yesAnswer) {
              ++counter;
            }
          }
          if (counter === basicKnowledges[key].length) {
            setGotcha(key)
          }
        }

      } else {
        noAnswers.push(`B${questionNumber}`)
      }
      nextQuestion = yesAnswers.length === 0 ? nextQuestion : parseInt(filter(Object.values(basicKnowledges))!)
      // console.log(Object.values(basicKnowledges).filter(array1D => array1D.filter(data => yesAnswers.)).filter(array1D => array1D.filter(data => !noAnswers.includes(data))))
    } else if (questionNumber === maxQuestionNumber) {
      answered.push(`B${questionNumber}`);
      if(answer === 'yes') yesAnswers.push(`B${questionNumber}`);
      else noAnswers.push(`B${questionNumber}`)
      setResult(yesAnswers);
    }

    if (questionNumber <= maxQuestionNumber) {
      console.log(nextQuestion)
      setQuestionNumber(nextQuestion!);
    }
  }
  }

  function filter(array2D : string[][]) : string | undefined {
      for (const array1D of array2D) {
        let ok = true;
        for (const data of array1D) {
          if (noAnswers.includes(data)) {
            ok = false
            break;
          }
        }
        if (ok) {
          let ok1 = 0;
          for (const data of array1D) {
            if (yesAnswers.includes(data)) {
              ++ok1;
            } else {
              if (ok1 === yesAnswers.length) return data.split("B")[1];
            }
          }
        }
      }
  }


  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[60%] h-96 rounded-lg shadow-2xl py-10 px-6 flex flex-col justify-between">
          {gotcha !== null && <p>{`Dari ciri-ciri yang diberikan, jenis ikan yang dimaksud adalah : ${gotcha}`}</p>}
          {summary === null && gotcha === null && <p>{question}</p>}
          {(result.length === 0 && summary === null && gotcha === null) && <div className='flex justify-between items-center'>
          <button onClick={() => onClick('yes')} >Ya</button>
          <button onClick={() => onClick('no')} >Tidak</button>
          </div>}
          {gotcha === null && result.length === 0 && summary !== null && <p>{summary}</p>}
          {gotcha === null && result.length !== 0 && summary !== null && 
          <div>
            <p>{summary}</p>
            {result.map((data,i) => <p key={i}>{data}</p>)}
            </div>
            }
        </div>
    </div>
  );
}
