class User < ApplicationRecord
    has_many :reviews
    has_many :books, through: :reviews
    has_secure_password
    has_one_attached :profile_picture, dependent: :destroy
    validates :name, presence: true
    validates :age, numericality: true
    validates :username, presence: true
    validates :username, uniqueness: true
end
