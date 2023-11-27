import { useContext, useState } from "preact/hooks";

import { AppContext } from "../AppContext";
import { Card } from "../components/Card/Card";
import Parallax from "../components/Parallax/Parallax";
import { Link } from "preact-router";

export function Home() {
  const { state, dispatch } = useContext(AppContext);

  return (<>
    <section>
      <Parallax>
        <h1>OcarinaHub</h1>
        <Link type="button" href="/login" class="button">Login</Link>
        <Link type="button" href="/register" class="button">Register</Link>
      </Parallax>
      <h1>Recommendations</h1>
      <div class="grid-container">
        {state.recommendations.map(recommendation => {
          return (
            <Card 
              key={recommendation.link}
              ocarina={recommendation}
            ></Card>
          )
        })}
      </div>
    </section>
  </>)
}
  