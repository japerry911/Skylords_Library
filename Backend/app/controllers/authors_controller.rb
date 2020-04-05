class AuthorsController < ApplicationController
    def index
        @authors = Author.all 

        render json: @authors 
    end

    def show 
        @author = Author.find(params[:id])

        render json: @autor 
    end
end
