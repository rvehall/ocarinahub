import { useEffect, useState } from 'preact/hooks';
import { useContext } from 'preact/hooks';

import { AppContext } from '../AppContext';
import { Card } from "../components/Card/Card";
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { Input } from '../components/Input/Input';

export function Collection() {
  const { state, dispatch } = useContext(AppContext);
  const [token, updateToken] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recommendations, updateRecommendation] = useState([]);
  const [collection, updateCollection] = useState([]);

  const [ocarina, updateOcarina] = useState({});
  const [collect, updateCollect] = useState({});
  const [review, updateReview] = useState({});
  const [formData, setFormData] = useState({
    maker: '',
    img_link: '',
    product_link: '',
    chamber_count: 0,
    hole_count: 0,
    type: '',
    custom: '',
    currently_have: false,
    rating: 0,
    description: ''
  });

  const openModal = (content) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const cookie = document.cookie.split("="); 
    updateToken(`bearer ${cookie[1]}`);
    fetch("http://localhost:8000/recommendation", { 
      mode: "cors", 
      headers: {"Authorization": `bearer ${cookie[1]}`} 
    })
      .then(response => response.json())
      .then(data => { updateRecommendation(data) })

    fetch("http://localhost:8000/collections", {
      mode: "cors", 
      headers: {"Authorization": `bearer ${cookie[1]}`} 
    })
      .then(response => response.json())
      .then(data => { updateCollection(data) })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateOcarina({
      maker: formData.maker,
      img_link: formData.img_link,
      product_link: formData.product_link,
      chamber_count: formData.chamber_count,
      hole_count: formData.hole_count,
      type: formData.type,
      custom: formData.custom,
    })

    const newOcarina = await fetch("http://localhost:8000/ocarinas", {
      method: "POST",
      body: JSON.stringify(ocarina),
      headers: {"Authorization": token} 
    })

    const newOcarinaJson = await newOcarina.json()
    updateOcarina(newOcarinaJson)

    updateCollect({
      currently_have: formData.currently_have,
      owner_id: state.user.id,
      ocarina_id: newOcarinaJson.id
    })

    updateReview({
      ocarina_id: newOcarinaJson.id,
      user_id: state.user.id,
      rating: formData.rating,
      description: formData.description
    })

    const updatedCollection = await fetch("http://localhost:8000/collections", {
      method: "POST",
      body: JSON.stringify(collect),
      headers: {"Authorization": token} 
    })

    const collectionJson = await updatedCollection.json()
    updateCollect(collectionJson)

    const updatedReview = await fetch("http://localhost:8000/collections", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {"Authorization": token} 
    })

    const reviewJson = await updatedReview.json()
    updateCollect(reviewJson)
    closeModal()
  }

  const { maker, img_link, product_link, chamber_count, hole_count, type, custom, currently_have, rating, description } = formData;

    return (
      <>
      <h1>My Collection</h1>
      <div class="grid-container">
        {collection && collection.map(collection => {
              return (
                <Card 
                  key={collection.link}
                  ocarina={collection}
                ></Card>
              )
            }) }
          <Button 
            type="button" 
            name="open_modal" 
            onClick={openModal}>
              Add
          </Button>
        </div>
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
        >
          <article className="modal-mainContents">
          <form onSubmit={handleSubmit}>
          <h5 className="modal-title">Add Ocarina to Collection</h5>
          <hr />
          <div className="mt-lg-3 modalText">
            <div>
              <Input
                type="text"
                name="maker"
                value={maker}
                onChange={handleInputChange}
                required={true}
                label="Maker"
              />
            </div>
            <div>
              <Input
                type="text"
                name="img_link"
                value={img_link}
                onChange={handleInputChange}
                required={true}
                label="Image Link"
                />
            </div>
            <div>
              <Input
                type="text"
                name="product_link"
                value={product_link}
                onChange={handleInputChange}
                required={true}
                label="Product Link"
                />
            </div>
            <div>
              <Input
                type="number"
                name="chamber_count"
                value={chamber_count}
                onChange={handleInputChange}
                required={true}
                label="Chamber Count"
                />
            </div>
            <div>
              <Input
                type="number"
                name="hole_count"
                value={hole_count}
                onChange={handleInputChange}
                required={true}
                label="Hole Count"
                />
            </div>
            <div>
              <Input
                type="text"
                name="type"
                value={type}
                onChange={handleInputChange}
                required={true}
                label="Type"
                />
            </div>
            <div>
              <Input
                type="checkbox"
                name="custom"
                value={custom}
                onChange={handleInputChange}
                required={false}
                label="Custom"
                />
            </div>
            <div>
              <Input
                type="checkbox"
                name="currently_have"
                value={currently_have}
                onChange={handleInputChange}
                required={false}
                label="Currently Have"
                />
            </div>
            <div>
              <Input
                type="number"
                name="rating"
                value={rating}
                onChange={handleInputChange}
                required={true}
                label="Rating"
                />
            </div>
            <div>
              <Input
                type="text"
                name="description"
                value={description}
                onChange={handleInputChange}
                required={true}
                label="Review"
                />
            </div>
            <div className="modal-button text-end">
              <Button 
                type="button" 
                name="cancel" >
                  Cancel
              </Button>
              <Button 
                type="submit" 
                name="add" >
                  Submit
              </Button>
            </div>
            </div>
          </form>
        </article>
        </Modal>


      <h1>Recommendations For Me</h1>
      <div class="grid-container">
        {recommendations && recommendations.map(recommendation => {
              return (
                <Card 
                  key={recommendation.link}
                  ocarina={recommendation}
                ></Card>
              )
            })}
        </div>
      </>
    )
  }
  