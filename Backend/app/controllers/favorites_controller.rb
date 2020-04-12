class FavoritesController < ApplicationController
    def index
        @favorites = Favorite.all 

        render json: { favorites: @favorites }, include: { book: {}, user: {} }
    end

    def show
        @favorite = Favorite.find(params[:id])

        render json: { favorite: @favorite }, include: { book: {}, user: {} }
    end

    def create
        @new_favorite = Favorite.create(favorite_params)

        render json: { favorite: @favorite }, include: { book: {}, user: {} }
    end

    private

        def favorite_params
            params.require(:favorite).permit(:user_id, :book_id)
        end
end
