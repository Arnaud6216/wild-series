interface Program {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  year: number;
  country: string;
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgramDeleteForm from "../../components/ProgramDeleteForm";

function ProgramDetail() {
  const { id } = useParams();
  const [programs, setPrograms] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setPrograms(data);
      });
  }, [id]);

  return (
    programs && (
      <>
        <h1>{programs.title}</h1>
        <Link to={`/programs/${programs.id}/edit`}>Modifier</Link>
        <ProgramDeleteForm id={programs.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
