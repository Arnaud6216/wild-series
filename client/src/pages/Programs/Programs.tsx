import "./Programs.css";

interface ProgramProps {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  year: number;
  country: string;
}

import { useEffect, useState } from "react";

function Programs() {
  const [programList, setProgramList] = useState<ProgramProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((response) => response.json())
      .then((data) => {
        setProgramList(data);
      });
  }, []);

  return (
    <>
      {programList.map((program: ProgramProps) => (
        <div className="serie-card" key={program.id}>
          <h2 className="serie-title">{program.title}</h2>
          <img className="serie-img" src={program.poster} alt={program.title} />
          <p className="serie-synopsis">{program.synopsis}</p>
          <p className="serie-year">{program.year}</p>
          <p className="serie-country">{program.country}</p>
        </div>
      ))}
    </>
  );
}

export default Programs;
