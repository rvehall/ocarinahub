from schemas.ocarinas import *
from models import accounts, ocarinas, reviews
from sqlalchemy.orm import Session
import math

class RecomendationService:
    users = []
    ocarinas = []
    reviews = []
    user_item_matrix = {}
    default_recommendations = [{
        "maker": "Night by Noble",
        "img_link": "https://m.media-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369110_.gif",
        "product_link": "https://www.amazon.com/Night-Noble-Plastic-Ocarina-Black/dp/B008WYNVAW",
        "chamber_count": 1,
        "hole_count": 12,
        "material": "plastic",
        "type": "Alto C",
    },
    {
        "maker": "Stein Ocarina",
        "img_link": "http://www.steinocarina.com/webimages/136621587610_01.JPG",
        "product_link": "http://www.steinocarina.com/productList.php?class=2&line=4",
        "chamber_count": 1,
        "hole_count": 12,
        "material": "plastic",
        "type": "Alto C/Soprano C"
    },
    {
        "maker": "Imperial City Ocarina",
        "img_link": "https://imperialcityocarina.com/images/cache/ac-12-hole-prod-desc-gallery.270.JPG",
        "product_link": "https://imperialcityocarina.com/alto-12-hole-key-of-c-p341.html",
        "chamber_count": 1,
        "hole_count": 12,
        "material": "ceramic",
        "type": "Alto C"
    }]
    
    def calculate_similarity(self, user1_id, user2_id):
        user1_ratings =self.user_item_matrix.get(user1_id, {})
        user2_ratings = self.user_item_matrix.get(user2_id, {})
        
        common_ocarinas = set(user1_ratings.keys()) & set(user2_ratings.keys())
        if not common_ocarinas:
            return 0
        
        sum_product = sum(user1_ratings[ocarina] * user2_ratings[ocarina] for ocarina in common_ocarinas)
        sum_squares_user1 = sum(math.pow(user1_ratings[ocarina], 2) for ocarina in common_ocarinas)
        sum_squares_user2 = sum(math.pow(user2_ratings[ocarina], 2) for ocarina in common_ocarinas)
        
        return sum_product / (math.sqrt(sum_squares_user1) * math.sqrt(sum_squares_user2))

    def get_top_similar_users(self, user_id, k=2):
        similarities = [(other_user_id, self.calculate_similarity(user_id, other_user_id)) 
                        for other_user_id in self.user_item_matrix.keys() if other_user_id != user_id]
        return sorted(similarities, key=lambda x: x[1], reverse=True)[:k]

    def get_unrated_ocarinas(self, user_id):
        rated_ocarinas = self.user_item_matrix.get(user_id, {}).keys()
        return [ocarina for ocarina in self.ocarinas if ocarina['id'] not in rated_ocarinas]

    def predict_ratings(self, target_user, similar_users):
        predicted_ratings = {}
        for ocarina in self.get_unrated_ocarinas(target_user):
            ratings_sum = 0
            similarity_sum = 0
            for user, similarity in similar_users:
                user_ratings = self.user_item_matrix.get(user, {})
                if ocarina['id'] in user_ratings:
                    ratings_sum += similarity * user_ratings[ocarina['id']]
                    similarity_sum += similarity
            if similarity_sum != 0:
                predicted_ratings[ocarina['id']] = ratings_sum / similarity_sum
        return predicted_ratings
    def get_data(self, db: Session):
        results = db.query(
                ocarinas.Ocarina,
                reviews.Review,
                accounts.User
            ).join(
                reviews.Review, reviews.Review.ocarina_id == ocarinas.Ocarina.id
            ).join(
                accounts.User, reviews.Review.user_id == accounts.User.id
            ).all()
        for result in results:
            ocarina = result[0].as_dict()
            self.ocarinas.append(ocarina)

            review = result[1].as_dict()
            self.reviews.append(review)
            
            user = result[2].as_dict()
            self.users.append(user)
            
            user_id = review['user_id']
            ocarina_id = review['ocarina_id']
            rating = review['rating']
            
            if user_id not in self.user_item_matrix:
                self.user_item_matrix[user_id] = {}
            self.user_item_matrix[user_id][ocarina_id] = rating

    def recommend_ocarinas(self, db: Session, target_user: str, k=2):
        self.get_data(db)
        similar_users = self.get_top_similar_users(target_user)
        predicted_ratings = self.predict_ratings(target_user, similar_users)
        recommended_ocarinas = sorted(predicted_ratings.items(), key=lambda x: x[1], reverse=True)[:k]
        recomendations = [ocarina for ocarina_id, _ in recommended_ocarinas for ocarina in self.ocarinas if ocarina['id'] == ocarina_id]
        return recomendations if len(recomendations) > 0 else self.default_recommendations