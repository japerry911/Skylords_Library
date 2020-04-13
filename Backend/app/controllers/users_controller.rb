class UsersController < ApplicationController
    def index 
        @users = User.all 

        render json: { users: @users } 
    end

    def show 
        @user = Reader.find(params[:id])

        render json: { user: @user } 
    end

    def create
        @new_user = User.create(user_params)

        render json: { user: @new_user }
    end

    private
    
        def user_params
            params.require(:user).permit([:username, :age, :password, :phone, :email])
        end
end
