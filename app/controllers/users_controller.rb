class UsersController < ApplicationController

    def show
    end

    def create
        user = User.create(user_params)
        render json: user
    end

    private

    def user_params
        params.permit(:username, :password)
    end
end
