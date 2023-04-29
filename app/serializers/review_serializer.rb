class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :book_id, :user_id
  belongs_to :user
  belongs_to :book
end
