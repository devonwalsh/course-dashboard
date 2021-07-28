class CategoriesController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        categories_with_courses = User.
            select("users.id, categories.name as category, courses.title, courses.source").
            joins(:categories).
            where("users.id = '#{user.id}'")
        render json: categories_with_courses
    end

    def create
        category = Category.create(category_params)
        render json: category, status: :created
    end

    private

    def category_params
        params.permit(:name)
    end
end