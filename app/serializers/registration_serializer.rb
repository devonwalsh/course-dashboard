class RegistrationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :course_id, :start_date, :end_date, :progress, :course, :category, :notes

end
