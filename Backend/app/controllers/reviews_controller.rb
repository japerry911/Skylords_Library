class ReviewsController < ApplicationController
    def index
        @reviews = Review.all 

        render json: { reviews: @reviews }, include: { book: {}, user: {} }
    end

    def show 
        @review = Review.find(params[:id])

        render json: @review
    end

    def create 
        @new_review = Review.create(review_params)

        render json: { review: @new_review }, include: { book: {}, user: {} }
    end
    
    def most_recent_two_reviews
        @most_recent_2_reviews = Review.order(created_at: :desc).limit(2)

        @book1 = @most_recent_2_reviews[0].book
        @book2 = @most_recent_2_reviews[1].book
        @user1 = { username: @most_recent_2_reviews[0].user.username, age: @most_recent_2_reviews[0].user.age }
        @user2 = { username: @most_recent_2_reviews[1].user.username, age: @most_recent_2_reviews[1].user.age }

        render json: { reviews: [
                                { user: @user1, book: @book1, review: @most_recent_2_reviews[0] }, 
                                { user: @user2, book: @book2, review: @most_recent_2_reviews[1] }
                                ]}
    end

    private
    
        def review_params
            params.require(:review).permit(:book_id, :user_id, :rating, :description)
        end
end
