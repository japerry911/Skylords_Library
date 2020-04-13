class UsersController < ApplicationController
    before_action :authenticate, only: [:index, :show]

    def index 
        @users = User.all 

        render json: { users: @users.as_json(:only => [:id, :username, :age, :phone, :email]) }
    end

    def show 
        @user = User.find(params[:id])

        render json: { user: @user.as_json(:only => [:id, :username, :age, :phone, :email]) }
    end

    def create
        @new_user = User.create(user_params)

        render json: { user: @new_user.as_json(:only => [:id, :username, :age, :phone, :email]) }
    end

    private
    
        def user_params
            params.require(:user).permit([:username, :age, :password, :phone, :email])
        end
end
