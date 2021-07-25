class User < ApplicationRecord
    has_secure_password
    has_and_belongs_to_many :courses
    has_many :categories, through: :courses

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
