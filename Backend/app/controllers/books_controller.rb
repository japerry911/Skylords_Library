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
        @new_book = Book.create(book_params)

        render json: { book: @new_book }, include: :author
    end

    private

        def book_params
            params.require(:book).permit([:title, :image_url, :description, :author_id])
        end
end
