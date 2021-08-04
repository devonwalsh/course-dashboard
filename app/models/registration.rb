class Registration < ApplicationRecord
    belongs_to :user
    belongs_to :course

    has_one :category, through: :course
end
