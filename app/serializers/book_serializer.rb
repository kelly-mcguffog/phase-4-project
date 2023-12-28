class BookSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :genre, :author, :summary, :book_image, :page_count
  has_many :reviews, serializer: ReviewSerializer

  def book_image
    if object.book_image.attached?
      rails_blob_path(object.book_image, only_path: true)
    else
     "https://book-club-app.s3.amazonaws.com/images/fallback/book-placeholder.jpg"
    end
  end

end
