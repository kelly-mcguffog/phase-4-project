class Review < ApplicationRecord
    belongs_to :user
    belongs_to :book
    validates :rating, numericality: true
end
