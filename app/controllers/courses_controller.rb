class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses
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
