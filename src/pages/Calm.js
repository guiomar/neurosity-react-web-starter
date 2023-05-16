import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav } from "../components/Nav";

import calmPic from '../pages/calmpic.jpg';

export function Calm() {
  const { user } = useNotion();
  const [calm, setCalm] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0); // define the blur amount as a state variable


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const subscription = notion.calm().subscribe((calm) => {
      const calmScore = Math.trunc(calm.probability * 100);
      //const blurScore = 10;
      const blurScore = 100-calmScore;
      setCalm(calmScore);
      setBlurAmount(blurScore);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <main className="main-container">
      {user ? <Nav /> : null}
      <div className="calm-score">
        &nbsp;{calm}% <div className="calm-word">Calm</div>
      </div>
      <div className="calm-image">
        <img src={calmPic} alt="My hola" style={{ filter: `blur(${blurAmount}px)` }}/>
      </div>
    </main>
  );
}
