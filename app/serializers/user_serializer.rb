class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :age, :profile_picture
  has_many :reviews
  has_many :books, through: :reviews
end
