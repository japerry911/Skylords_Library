class ReviewsController < ApplicationController
    before_action :authenticate

    def index
        @reviews = Review.all 

        render json: { reviews: @reviews }, include: { user: { only: [:username, :id]}, book: { include: { author: { only: [:name] }}}}
    end

    def show 
        @review = Review.find(params[:id])

        render json: @review
    end

    def create 
        @new_review = Review.create(review_params)

        render json: { review: @new_review }, include: { user: { only: [:username, :id]}, book: { include: { author: { only: [:name] }}}}
    end

    def destroy
        @to_destroy_review = Review.find(params[:id])

        @to_destroy_review.destroy
    end
    
    def most_recent_five_reviews
        @most_recent_5_reviews = Review.order(created_at: :desc).limit(5)

        json_ready_reviews = @most_recent_5_reviews.map {|review| { user: { username: review.user.username, age: review.user.age }, 
                                                                    book: review.book, review: review }}

        render json: { reviews: json_ready_reviews }
    end

    private
    
        def review_params
            params.require(:review).permit(:book_id, :user_id, :rating, :description)
        end
end
