class ReadersController < ApplicationController
    def index 
        @readers = Reader.all 

        render json: @readers 
    end
end
