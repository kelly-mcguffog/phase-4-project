class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :author, :summary, :book_image, :page_count
  has_many :reviews
  has_many :users, through: :reviews
end
