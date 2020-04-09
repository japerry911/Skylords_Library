class AuthorsController < ApplicationController
    def index
        @authors = Author.all 

        render json: @authors 
    end

    def show 
        @author = Author.find(params[:id])

        render json: @author 
    end

    def create
        @new_author = Author.create(name: params[:name])

        render json: @new_author 
    end
end
