class CategoriesController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        categories_with_courses = User.
            select("users.id, categories.name as category, courses.title, courses.source").
            joins(:categories).
            where("users.id = '#{user.id}'")
        render json: categories_with_courses
    end
end