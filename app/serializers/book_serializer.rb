class BookSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :genre, :author, :summary, :book_image, :page_count
  has_many :reviews

  def book_image
    rails_blob_path(object.book_image, only_path:true) if object.book_image.attached?
  end

end
