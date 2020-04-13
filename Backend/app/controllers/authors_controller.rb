class AuthorsController < ApplicationController
    before_action :authenticate

    def index
        @authors = Author.all 

        render json: { authors: @authors } 
    end

    def show 
        @author = Author.find(params[:id])

        render json: { author: @author } 
    end

    def create
        @new_author = Author.create(author_params)

        render json: { author: @new_author } 
    end

    private

        def author_params
            params.require(:author).permit([:name])
        end
end
