import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';


function CrewmateInfo() {
  const { crewmateId } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    async function fetchCrewmate() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", crewmateId)
          .single();
        if (error) throw error;
        setCrewmate(data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCrewmate();
  }, [crewmateId]);

  if (!crewmate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Crewmate Info</h2>
      <h3>Name: {crewmate.name}</h3>
      <p>Description: {crewmate.description}</p>
    </div>
  );
}

export default CrewmateInfo;
