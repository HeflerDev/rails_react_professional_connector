class AppointmentsController < ApplicationController
  def index
    @appointment = Appointment.all.order()

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: {
        status: 'created',
        appointment: @appointment
      }
    else
      render json: {
        status: 500,
        errors: @appointment.errors.full_messages
      }
    end
  end

    private

    def appointment_params
      params.require(:appointment).permit(:user_id, :professional_id, :schedule)
    end
end
