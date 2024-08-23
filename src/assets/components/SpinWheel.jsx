import React, { useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FaLocationArrow } from "react-icons/fa";
import Stars from '../../assets/star.jpg'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [couleurAngle, setCouleurAngle] = useState('');
  const [question, setQuestion] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef(null);

  const spinValues = [
    {
      minDegree: 61,
      maxDegree: 90,
      value: 1,
      couleur:"#FFFFFF",
      question:
        "Comment la couleur blanche est-elle perçue dans différentes cultures, et quelles significations lui sont attribuées ?",    
    },
    {
      minDegree: 31,
      maxDegree: 60,
      value: 2,
      couleur:"#C0C0C0",
      question:
        "De quelle manière la psychologie des couleurs influence-t-elle la prise de décision ou le comportement ?",
    },

    {
      minDegree: 0,
      maxDegree: 30,
      value: 3,
      couleur:"#33c4ff",
      question:
        "Comment la couleur bleue est-elle utilisée pour exprimer des émotions telles que la tranquillité ou la tristesse dans la culture populaire ?",

    },
    {
      minDegree: 331,
      maxDegree: 360,
      value: 4,
      couleur:"#C0C0C0",
      question:
        "Comment la symbolique des couleurs a-t-elle évolué au fil du temps dans différentes civilisations ?",
    },
    {
      minDegree: 301,
      maxDegree: 330,
      value: 5,
      couleur:"#008000",
      question:
        "Comment le vert est-il symboliquement lié à la nature et à l'écologie dans différentes sociétés ?",
    },
    {
      minDegree: 271,
      maxDegree: 300,
      value: 6,
      couleur:"#C0C0C0",
      question:
        "Quel rôle les couleurs ont-elles joué dans l'identité nationale et la propagande historique ?",
    },
    {
      minDegree: 241,
      maxDegree: 270,
      value: 7,
      couleur:"#33c4ff",
      question:
        "Analysez l'expression « avoir le blues » ou l'utilisation du bleu dans les films et la musique pour évoquer la mélancolie.",
    },
    {
      minDegree: 211,
      maxDegree: 240,
      value: 8,
      couleur:"#C0C0C0",
      question:
        "De quelle manière les couleurs influencent-elles la mémorisation d'une publicité",
    },
    {
      minDegree: 181,
      maxDegree: 210,
      value: 9,
      couleur:"#FF00FF",
      question:
        "Comment la couleur rose est-elle utilisée en publicité pour cibler des audiences spécifiques,notamment en termes de genre ou de segments démographiques",
    },
    {
      minDegree: 151,
      maxDegree: 180,
      value: 10,
      couleur:"#C0C0C0",
      question:
        "Quelle est l'importance des couleurs dans la publicité en ligne, et comment influencent-elles le comportement des consommateurs dans un environnement numérique ?",
    },
    {
      minDegree: 121,
      maxDegree: 150,
      value: 11,
      couleur:"#808080",
      question:
        "Comment la couleur grise est-elle employée dans la publicité pour exprimer la neutralité, la modernité ou la sophistication ?",
    },
    {
      minDegree: 91,
      maxDegree: 120,
      value: 12,
      couleur:"#C0C0C0",
      question:
        "Comment les couleurs influencent-elles la perception de la qualité et du prix d'un produit dans la publicité ?",
    },
  ];

  const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

  const spinColors = [
    "#FFFFFF","#C0C0C0","#33c4ff","#C0C0C0","#008000","#C0C0C0","#33c4ff","#C0C0C0","#FF00FF","#C0C0C0","#808080","#C0C0C0",
  ];

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [{
      backgroundColor: spinColors,
      data: size,
    }],
  };

  const options = {
    responsive: true,
    animation: { duration: 0 },
    rotation: rotation,
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        rotation: 90,
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  };

  const generateValue = (angleValue) => {
    for (let i of spinValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setQuestion(`Question ${i.value}: ${i.question}`);
        setCouleurAngle(i.couleur);
        break;
      }
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setQuestion('Bonne chance!');
    const randomDegree = Math.floor(Math.random() * 360);
    let currentRotation = rotation;
    let speed = 10;
    let deceleration = 0.02;
    let slowSpinCount = 0;

    const spin = () => {
      currentRotation += speed;
      if (currentRotation >= 360) {
        currentRotation %= 360;
      }
      setRotation(currentRotation);

      if (speed > 0.5) {
        speed -= deceleration;
      } else {
        speed = 0.5;
        slowSpinCount++;
        
        if (slowSpinCount > 50) {
          speed -= 0.01;
          if (speed <= 0) {
            clearInterval(spinIntervalRef.current);
            setRotation(randomDegree);
            generateValue(randomDegree);
            setIsSpinning(false);
            return;
          }
        }
      }

      if (Math.abs(currentRotation - randomDegree) < 1 && speed < 0.5) {
        clearInterval(spinIntervalRef.current);
        setRotation(randomDegree);
        generateValue(randomDegree);
        setIsSpinning(false);
      }
    };
    spinIntervalRef.current = setInterval(spin, 10);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4"
    style={{ backgroundImage: `url(${Stars})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >      
      <h1 className="text-4xl font-bold text-[#FFD700] mb-4 z-10 bg-black p-4 rounded-md border-white border-2">La chance des couleurs</h1>
      <div className="relative w-full max-w-md z-10">
        <div className="aspect-square">
          <Pie data={data} options={{...options, rotation: rotation}} />
        </div>
        <button 
          onClick={handleSpin} 
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold 
                     rounded-full w-24 h-24 shadow-lg transition duration-300 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Rotation...' : 'Faire tourner'}
        </button>
        <div className='absolute top-4 right-0 rotate-[225deg] translate-x-6 translate-y-48' >
        <FaLocationArrow  className='w-10 h-10' />
        </div>
        
      </div>
      <div className="mt-2 p-4 rounded-lg shadow-lg w-full max-w-md z-20" style={{backgroundColor:`${couleurAngle}`}}>
        <p className="text-center text-xl font-semibold text-gray-800">
          {question || "Faites tourner la roue pour avoir une question!"}
        </p>
      </div>
    </div>
  );
};

export default SpinWheel;