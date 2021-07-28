class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :source, :category, :user_count

  belongs_to :category

  def user_count
    object.users.count
  end
end
