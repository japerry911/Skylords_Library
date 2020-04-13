class SessionsController < ApplicationController
    def new
    end

    def login
        @user = User.find_by(username: user_params[:username])

        if @user && @user.authenticate(user_params[:password])
            render json: { user: { age: @user.age, id: @user.id, username: @user.username, phone: @user.phone, email: @user.email }}
        else
            render :status => 401
        end
    end

    def destroy
    end

    private

        def user_params
            params.require(:user).permit([:username, :password])
        end
end
