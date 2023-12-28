class BooksController < ApplicationController
    before_action :find_book, only: [:update, :destroy]

    def index
        books = Book.all
        render json: books, each_serializer: BookSerializer, include: ["reviews", "reviews.user"], status: :ok
    end

    def show
        render json: find_book, each_serializer: BookSerializer, status: :ok
    end

    def update
        @book.update!(book_params)
        render json: @book, each_serializer: BookSerializer, include: ["reviews", "reviews.user"], status: :ok
    end

    def create
        new_book = Book.create!(book_params)
        render json: new_book, each_serializer: BookSerializer, status: :created
    end

    def destroy
        @book.destroy
        head :no_content
    end

    private

    def book_params
        params.require(:book).permit(:title, :genre, :author, :summary, :page_count, :book_image)
    end

    def find_book
        @book = Book.find(params[:id])
    end
end
