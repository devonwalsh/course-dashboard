class User < ApplicationRecord
    has_secure_password
    has_and_belongs_to_many :courses
    has_and_belongs_to_many :categories
end
