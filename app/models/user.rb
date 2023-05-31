class User < ApplicationRecord
    has_many :reviews
    has_many :books, through: :reviews
    has_secure_password
    validates :name, presence: true
    validates :age, numericality: true
    validates :username, presence: true
    validates :username, uniqueness: true
end
