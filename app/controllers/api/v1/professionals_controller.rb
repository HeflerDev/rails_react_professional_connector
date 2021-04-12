class Api::V1::ProfessionalsController < ApplicationController
  def index
    @professional = Professional.all.order(created_at: :desc)
    render json: @professional
  end

  def create
    @professional = Professional.new(professional_params)
    if @professional.save
      render json: @professional
    else
      render json: @professional.errors
    end
  end

  def show
    @professional = Professional.find(params[:id])
    if @professional
      render json: @professional
    else
      render json: @professional.errors
    end
  end

  def destroy
    @professional ||= Professional.find(params[:id])
    @professional.destroy
    render json: { message: 'Professional Deleted' }
  end

  private

  def professional_params
    params.permit(:name, :type, :description, :image)
  end
end
