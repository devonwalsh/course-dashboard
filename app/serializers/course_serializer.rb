class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :source

  belongs_to :category
end
