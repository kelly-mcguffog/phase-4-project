class User < ApplicationRecord
    has_many :reviews
    has_many :books, through: :reviews
    has_secure_password
    validates :username, uniqueness: true, on: :account_setup
    validates :age, numericality: true, on: :account_setup
end