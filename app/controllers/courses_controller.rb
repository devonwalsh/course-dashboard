class CoursesController < ApplicationController
    
    def create #login
        course = Course.create(course_params)
    end

    private

    def course_params
        params.permit(:title, :source, :category_id)
    end

end
