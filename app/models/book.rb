class Book < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews
    validates :title, :author, presence: true
    validates :page_count, numericality: true
end
