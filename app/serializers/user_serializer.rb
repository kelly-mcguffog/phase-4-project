class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :age, :profile_picture
  has_many :reviews
end
