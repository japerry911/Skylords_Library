class FavoritesController < ApplicationController
    def index
        @favorites = Favorite.all 

        render json: { favorites: @favorites }, include: { user: {}, book: { include: { author: { only: [:name] }}}}
    end

    def show
        @favorite = Favorite.find(params[:id])

        render json: { favorite: @favorite }, include: { book: {}, user: {} }
    end

    def create
        @new_favorite = Favorite.create(favorite_params)

        render json: { favorite: @new_favorite }, include: { user: {}, book: { include: { author: { only: [:name] }}}}
    end

    def destroy
        @destroy_favorite = Favorite.find(params[:id])

        @destroy_favorite.destroy
    end

    private

        def favorite_params
            params.require(:favorite).permit(:user_id, :book_id)
        end
end
