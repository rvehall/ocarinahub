import { useContext, useState } from "preact/hooks";

import { AppContext } from "../AppContext";
import { Card } from "../components/Card/Card";
import Parallax from "../components/Parallax/Parallax";
import { Link } from "preact-router";

export function Home() {
  const { state, dispatch } = useContext(AppContext);

  return (<>
      <Parallax>
        <h1>OcarinaHub</h1>
        <Link type="button" href="/login" class="button">Login</Link>
        <Link type="button" href="/register" class="button">Register</Link>
      </Parallax>
      <section>
        <h1>About</h1>
        <p>Welcome to OcarinaHub, your ultimate destination for discovering the perfect ocarina to match your musical journey.</p>

        <p>At OcarinaHub, we're passionate about the mystical and enchanting world of ocarinas. Our mission is to guide and inspire musicians, from beginners to seasoned players, in finding the ideal ocarina that resonates with their musical aspirations.
          </p>
        <p>Discover a curated selection of high-quality ocarinas crafted by skilled artisans from around the globe. Whether you're captivated by the serene tones of a sweet soprano ocarina or the deeper resonance of a bass ocarina, our collection offers a range of styles, materials, and designs to suit every player's preferences.
          </p>
        <p>Our recommendation system is powered by a blend of expert curation and collaborative filtering algorithms. By understanding your musical interests and playing style, we strive to offer personalized recommendations, ensuring that your ocarina experience is as harmonious as your melodies.
          </p>
        <p>Join our community of ocarina enthusiasts and embark on a melodious journey. Explore our comprehensive guides, tutorials, and reviews to deepen your understanding of the instrument. Whether you're seeking your first ocarina or expanding your collection, let us accompany you in discovering the magic of these timeless instruments.
          </p>
        <p>Unleash your creativity, express your emotions, and create soulful music with an ocarina that resonates with your heart. Let OcarinaHub be your trusted companion on this musical voyage</p>
      </section>
      <section>
        <h1>Recommendations for Beginners</h1>
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
  