class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :source, :category_id, :category
end
