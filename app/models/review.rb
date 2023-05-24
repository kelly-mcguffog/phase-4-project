class Review < ApplicationRecord
    belongs_to :user
    belongs_to :book
    validates :comment, presence: true
    validates :rating, numericality: true
end
