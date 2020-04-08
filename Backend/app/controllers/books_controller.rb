class BooksController < ApplicationController
    def index 
        @books = Book.all 

        render json: { books: @books }, include: :author
    end

    def show
        @book = Book.find(params[:id])

        render json: @book
    end
end
