class BooksController < ApplicationController
    def index
        render json: Book.all, status: :ok
    end
    def show
        book = Book.find(params[:id])
        render json: book
    end
    def create
        new_book = Book.create!(book_params)
        render json: new_book, status: :created
    end

    private

    def book_params
        params.permit(:title, :genre, :author, :summary, :book_image, :page_count)
    end
end
