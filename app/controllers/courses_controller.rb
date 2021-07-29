class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses, include: :users
    end

    def user_courses
        user = User.find_by(id: session[:user_id])
        categories_with_courses = User.
            select("users.id AS user_id, categories.name as category, courses.id AS id, courses.title, courses.source, courses_users.progress").
            joins(:categories).
            where("users.id = '#{user.id}'")
        render json: categories_with_courses
    end
    
    def create
        course = Course.create(course_params)
        render json: course, status: :created
    end

    def save
        user = User.find_by(id: session[:user_id])
        course = Course.find_by(id: course_params[:id])
        user.courses << course
        render json: course, status: :created
    end

    def unsave
        user = User.find_by(id: session[:user_id])
        # course = Course.find_by(id: course_params[:id])
        user.courses.delete(course_params[:id])
        categories_with_courses = User.
        select("users.id AS user_id, categories.name as category, courses.id AS id, courses.title, courses.source, courses_users.progress").
        joins(:categories).
        where("users.id = '#{user.id}' AND courses.id != '#{course_params[:id]}'")
        render json: categories_with_courses
    end

    def search
        course_params[:category_id] === "" ? category_id = "%" : category_id = course_params[:category_id]
        results = Course.all.where("LOWER(title) LIKE ? AND LOWER(source) LIKE ? AND CAST(category_id AS TEXT) LIKE ?", "%#{course_params[:title]}%", "%#{course_params[:source]}%", "#{category_id}")
        render json: results
    end

    private

    def course_params
        params.permit(:id, :title, :source, :category_id, :title, :source, :category_id, :course)
    end

end
