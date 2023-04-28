class BooksController < ApplicationController
    def index
        render json: Book.all, status: :ok
    end
end
