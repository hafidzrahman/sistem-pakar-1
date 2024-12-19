'use client';
import {useState} from 'react'

const basicKnowledges : {
  [indexer : string] : string[]
} = {
  Tuna : ['B1', 'B4', 'B15', 'B19'],
  Hiu : ['B2', 'B4', 'B6', 'B14'],
  Barakuda : ['B3', 'B11', 'B13', 'B14'],
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

const answers : any[] = [];

export default function Home() {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [result, setResult] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);

  let question = "";

  if (result.length === 0) {
    question = questions[`B${questionNumber}`];
  }

  if (result!.length !== 0 && summary === null) {
    let scores = new Array(Object.keys(basicKnowledges).length).fill(0);
    let totalScores = 0;
    let ok = false;
    for (const answer of answers) {
      if (!ok) {let i = 0;
      for (const key in basicKnowledges) {
        if(basicKnowledges[key].includes(answer) && !ok) {
        ++scores[i];
        ++totalScores;
        if (basicKnowledges[key].length === scores[i] && !ok) {
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


  async function onClick(answer : string) {
    const maxQuestionNumber = Object.keys(questions).length;
    if (answer === "yes" && questionNumber !== maxQuestionNumber) {
      answers.push(`B${questionNumber}`);

    } else if (questionNumber === maxQuestionNumber) {
      if(answer === 'yes') answers.push(`B${questionNumber}`);
      setResult(answers);
    }

    if (questionNumber <= maxQuestionNumber) {
      setQuestionNumber((prevEvent) => {
        return ++prevEvent;
      });
    }
    
  }


  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[60%] h-96 rounded-lg shadow-2xl py-10 px-6 flex flex-col justify-between">
          {summary === null && <p>{question}</p>}
          {(result.length === 0 && summary === null) && <div className='flex justify-between items-center'>
          <button onClick={() => onClick('yes')} >Ya</button>
          <button onClick={() => onClick('no')} >Tidak</button>
          </div>}
          {result.length === 0 && summary !== null && <p>{summary}</p>}
          {result.length !== 0 && summary !== null && 
          <div>
            <p>{summary}</p>
            {result.map((data,i) => <p key={i}>{data}</p>)}
            </div>
            }
        </div>
    </div>
  );
}
