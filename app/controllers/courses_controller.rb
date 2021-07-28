class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses, include: :users
    end

    def user_courses
        user = User.find_by(id: session[:user_id])
        categories_with_courses = User.
            select("users.id, categories.name as category, courses.title, courses.source").
            joins(:categories).
            where("users.id = '#{user.id}'")
        render json: categories_with_courses
    end
    
    def create
        course = Course.create(course_params)
        render json: course, status: :created
    end

    private

    def course_params
        params.permit(:title, :source, :category_id)
    end

end
