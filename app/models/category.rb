class Category < ApplicationRecord
    has_many :users, through: :courses
    has_many :courses

    validates :name, uniqueness: true
end
