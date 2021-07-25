class SessionsController < ApplicationController
    
    def create #login
        user = User.find_by(username: user_params[:username])
        if user&.authenticate(user_params[:password])
            session[:user_id] = user.id
            render json: user.id, status: :created
        else
            render json: { errors: "Invalid username or password" }, status: :unauthorized
        end
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def destroy #logout
        session.clear
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password)
    end

end
