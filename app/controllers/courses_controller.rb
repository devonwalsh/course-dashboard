class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses
    end

    def user_courses
        user = User.find_by(id: session[:user_id])
        courses = user.courses.includes(:category)
        render json: courses, :include => [:category]
    end
    
    def create #login
        course = Course.create(course_params)
    end

    private

    def course_params
        params.permit(:title, :source, :category_id)
    end

end
