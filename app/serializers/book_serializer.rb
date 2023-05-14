class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :author, :summary, :book_image, :page_count, :average_rating
  has_many :reviews
  has_many :users, through: :reviews


  def average_rating
    sum = 0
    object.reviews.map {|r| sum += r.rating}
    n = object.reviews.length
    (sum / n)
  end
end
