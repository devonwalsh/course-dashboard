class RegistrationSerializer < ActiveModel::Serializer
  attributes :id, :course_id, :start_date, :end_date, :notes
end
