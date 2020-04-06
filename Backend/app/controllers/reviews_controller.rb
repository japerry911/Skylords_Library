class ReviewsController < ApplicationController
    def index
        @reviews = Review.all 

        render json: @reviews
    end

    def show 
        @review = Review.find(params[:id])

        render json: @review 
    end
    
    def most_recent_review
        @most_recent_review = Review.order(created_at: :desc).first
        @book = @most_recent_review.book
        @user = { username: @most_recent_review.user.username, age: @most_recent_review.user.age }  

        render json: { user: @user, book: @book, review: @most_recent_review }
    end
end
