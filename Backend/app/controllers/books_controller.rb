class BooksController < ApplicationController
    def index 
        @books = Book.all 

        render json: { books: @books }, include: :author
    end

    def show
        @book = Book.find(params[:id])

        render json: @book, include: { author: {}, reviews: { include: { user: { only: [:username] }}}}
    end

    def create
        @new_book = Book.create(title: params[:title], image_url: params[:image_url], 
                                description: params[:description], author_id: params[:author_id])

        render json: @new_book
    end
end
