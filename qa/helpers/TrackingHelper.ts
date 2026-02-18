import axios from 'axios'
import crypto from 'crypto'

export class TrackingHelper {
  // Regla: Hash de Identidad para Meta/Google
  static generarHashSHA256(dato: string): string {
    return crypto
      .createHash('sha256')
      .update(dato.toLowerCase().trim())
      .digest('hex')
  }

  // Regla: Estados del Diagrama ER
  async consultarEstadoOrden(orderId: string) {
    const res = await axios.get(`${process.env.API_URL}/orders/${orderId}`)
    return res.data // Retorna status (Paid/Pending) y ConversionSent
  }
}
