class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses, include: :users
    end

    def show
        course = Course.find_by(id: course_params[:id])
        render json: course
    end
    
    def create
        course = Course.create(course_params)
        render json: course, status: :created
    end

    def search
        course_params[:category_id] === "" ? category_id = "%" : category_id = course_params[:category_id]
        results = Course.all.where("LOWER(title) LIKE ? AND LOWER(source) LIKE ? AND CAST(category_id AS TEXT) LIKE ?", "%#{course_params[:title]}%", "%#{course_params[:source]}%", "#{category_id}")
        render json: results
    end

    private

    def course_params
        params.permit(:id, :title, :source, :category_id, :title, :category_id, :description, :progress, :course)
    end

end
