class ReadersController < ApplicationController
    def index 
        @readers = Reader.all 

        render json: @readers 
    end

    def show 
        @reader = Reader.find(params[:id])

        render json: @reader 
    end
end
