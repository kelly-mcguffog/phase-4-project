class Book < ApplicationRecord
    has_many :reviews, dependent: :destroy
    has_many :users, through: :reviews
    validates :title, :author, presence: true
    validates :page_count, numericality: true

    GENRE = ['Action & Adventure', 'Mystery', 'Thriller', 'Historical Fiction', 'Horror', 'Romance', 'Short Story', 'Memoir', 'Children']
 
    validates :genre, inclusion: {
    in: GENRE,
    message: "must be one of the following: #{GENRE.join(', ')}"
  }

end

