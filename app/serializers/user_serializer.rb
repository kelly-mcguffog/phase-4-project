class UserSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :name, :username, :age, :profile_picture
  has_many :reviews

  def profile_picture
    if object.profile_picture.attached?
      rails_blob_path(object.profile_picture, only_path: true)
    else
     "https://book-club-app.s3.amazonaws.com/images/fallback/default.png"
    end
  end

end
