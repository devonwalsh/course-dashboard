class RegistrationsController < ApplicationController

    def index
        user = User.find_by(id: session[:user_id])
        registrations = user.registrations
        render json: registrations
    end

    def show
        user = User.find_by(id: session[:user_id])
        registration = user.registrations.find_by(id: registration_params[:id])
        render json: registration
    end

    def update
        user = User.find_by(id: session[:user_id])
        registration = user.registrations.find_by(id: registration_params[:id])
        registration.update(registration_params)
        render json: registration
    end

    private

    def registration_params
        params.permit(:id, :course_id, :start_date, :end_date, :progress, :notes, :registration)
    end

end
