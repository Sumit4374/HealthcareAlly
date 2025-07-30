import type { LabAppointment } from "@/types/document"
import { 
  getPatientLabAppointments,
  addLabAppointment,
  updateLabAppointment,
  deleteLabAppointment,
  getLabAppointmentById,
  getAllLabAppointments
} from "@/types/document"

export async function getPatientLabAppointmentsList(patientId: string) {
  try {
    const appointments = getPatientLabAppointments(patientId)
    return {
      success: true,
      appointments
    }
  } catch (error) {
    console.error("Error fetching lab appointments:", error)
    return {
      success: false,
      error: "Failed to fetch lab appointments",
      appointments: []
    }
  }
}

export async function createLabAppointment(appointment: Omit<LabAppointment, 'id'>) {
  try {
    const newAppointment: LabAppointment = {
      ...appointment,
      id: `lab-appt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    
    addLabAppointment(newAppointment)
    
    return {
      success: true,
      appointment: newAppointment
    }
  } catch (error) {
    console.error("Error creating lab appointment:", error)
    return {
      success: false,
      error: "Failed to create lab appointment"
    }
  }
}

export async function updateLabAppointmentDetails(appointmentId: string, updates: Partial<LabAppointment>) {
  try {
    const success = updateLabAppointment(appointmentId, updates)
    
    if (!success) {
      return {
        success: false,
        error: "Lab appointment not found"
      }
    }
    
    const updatedAppointment = getLabAppointmentById(appointmentId)
    
    return {
      success: true,
      appointment: updatedAppointment
    }
  } catch (error) {
    console.error("Error updating lab appointment:", error)
    return {
      success: false,
      error: "Failed to update lab appointment"
    }
  }
}

export async function cancelLabAppointment(appointmentId: string) {
  try {
    const success = updateLabAppointment(appointmentId, { status: "cancelled" })
    
    if (!success) {
      return {
        success: false,
        error: "Lab appointment not found"
      }
    }
    
    return {
      success: true
    }
  } catch (error) {
    console.error("Error cancelling lab appointment:", error)
    return {
      success: false,
      error: "Failed to cancel lab appointment"
    }
  }
}

export async function deleteLabAppointmentPermanently(appointmentId: string) {
  try {
    const success = deleteLabAppointment(appointmentId)
    
    if (!success) {
      return {
        success: false,
        error: "Lab appointment not found"
      }
    }
    
    return {
      success: true
    }
  } catch (error) {
    console.error("Error deleting lab appointment:", error)
    return {
      success: false,
      error: "Failed to delete lab appointment"
    }
  }
}

export async function getLabAppointmentDetails(appointmentId: string) {
  try {
    const appointment = getLabAppointmentById(appointmentId)
    
    if (!appointment) {
      return {
        success: false,
        error: "Lab appointment not found"
      }
    }
    
    return {
      success: true,
      appointment
    }
  } catch (error) {
    console.error("Error fetching lab appointment details:", error)
    return {
      success: false,
      error: "Failed to fetch lab appointment details"
    }
  }
}

export async function getAllLabAppointmentsList() {
  try {
    const appointments = getAllLabAppointments()
    return {
      success: true,
      appointments
    }
  } catch (error) {
    console.error("Error fetching all lab appointments:", error)
    return {
      success: false,
      error: "Failed to fetch lab appointments",
      appointments: []
    }
  }
}

// Helper function to get upcoming appointments
export async function getUpcomingLabAppointments(patientId: string) {
  try {
    const appointments = getPatientLabAppointments(patientId)
    const today = new Date()
    
    const upcomingAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate)
      return appointmentDate >= today && appointment.status !== "cancelled"
    })
    
    // Sort by date
    upcomingAppointments.sort((a, b) => 
      new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
    )
    
    return {
      success: true,
      appointments: upcomingAppointments
    }
  } catch (error) {
    console.error("Error fetching upcoming lab appointments:", error)
    return {
      success: false,
      error: "Failed to fetch upcoming lab appointments",
      appointments: []
    }
  }
}

// Helper function to get past appointments
export async function getPastLabAppointments(patientId: string) {
  try {
    const appointments = getPatientLabAppointments(patientId)
    const today = new Date()
    
    const pastAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate)
      return appointmentDate < today || appointment.status === "cancelled"
    })
    
    // Sort by date (most recent first)
    pastAppointments.sort((a, b) => 
      new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
    )
    
    return {
      success: true,
      appointments: pastAppointments
    }
  } catch (error) {
    console.error("Error fetching past lab appointments:", error)
    return {
      success: false,
      error: "Failed to fetch past lab appointments",
      appointments: []
    }
  }
}
