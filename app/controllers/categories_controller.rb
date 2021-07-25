class CategoriesController < ApplicationController
    def user_categories
        user = User.find_by(id: session[:user_id])
        categories = user.categories.includes(:courses)
        render json: categories, :include => [:courses]
    end
end
