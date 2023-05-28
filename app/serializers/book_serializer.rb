class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :author, :summary, :book_image, :page_count, :average_rating
  has_many :reviews

  def rating
    self.object.reviews.map do |r|
      rating = r.rating
    end
  end

  def average_rating
    rating.sum / rating.size
  end
end
