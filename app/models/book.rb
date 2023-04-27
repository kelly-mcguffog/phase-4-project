class Book < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews
    validates :title, :author, presence: true
    validates :page_count, numericality: true

    GENRE = ['Action & Adventure', 'Mystery', 'Thriller', 'Historical Fiction', 'Horror', 'Romance', 'Short Story', 'Memoir & Autobiography', 'Children']

    validates :genre, inclusion: {
    in: GENRE,
    message: "Must be one of: #{GENRE.join(', ')}"
  }
end
