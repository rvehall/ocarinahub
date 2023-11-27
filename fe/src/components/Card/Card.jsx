import { h } from 'preact';
import './Card.css'; // Import your Card component's CSS file
import { Button } from '../Button/Button';

export const Card = ({ ocarina }) => {
  return (
    <div class="card">
      <img class="card-image" src={ocarina.img_link} alt={ocarina.maker} />
      <div class="card-content">
        <h2 class="card-title">{ocarina.type}</h2>
        <p class="card-description"><strong>Maker:</strong> {ocarina.maker}</p>
        <p class="card-description"><strong>Chamber Count:</strong> {ocarina.chamber_count}</p>
        <p class="card-description"><strong>Number of Holes:</strong> {ocarina.hole_count}</p>
        <p class="card-description"><strong>Material:</strong> {ocarina.material}</p>
        <Button 
          type="button" 
          name="product_link" 
          onClick={() => {window.open(ocarina.product_link)}}>
            Product Link
        </Button>
      </div>
    </div>
  );
};

