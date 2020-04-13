class SessionsController < ApplicationController
    def login
        @user = User.find_by(username: user_params[:username])

        if !@user 
            render json: { message: 'Wrong user' }, status: :unauthorized
        else
            if @user.authenticate(user_params[:password])
                payload = {
                    user_id: @user.id
                }
                secret_key = Rails.application.secret_key_base

                token = JWT.encode(payload, secret_key)
                
                render json: { user: { age: @user.age, id: @user.id, username: @user.username, phone: @user.phone, email: @user.email,
                                token: token }}
            else
                render json: { message: 'Wrong password' }, status: :unauthorized
            end
        end
    end

    private

        def user_params
            params.require(:user).permit([:username, :password])
        end
end
