import { useErrorDialogStore } from '@/stores/errorDialog'
import api from './axios'

export async function apiCall(endpoint, payload = {}, method = 'post') {
  const useErrorDialog = useErrorDialogStore()
  
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint}`

    let res
    switch (method.toLowerCase()) {
      case 'put':
        res = await api.put(url, payload)
        break
      case 'patch':
        res = await api.patch(url, payload)
        break
      case 'delete':
        res = await api.delete(url, { data: payload })
        break
      case 'post':
      default:
        res = await api.post(url, payload)
        break
    }

    return res.data
  } catch (err) {
    const errorResponse = err?.response?.data
    
    if (errorResponse?.errors) {
      useErrorDialog.setValidationError(errorResponse.errors || [])
    }
    useErrorDialog.setError(
      errorResponse?.message || errorResponse?.error || 'Internal server error',
    )
    throw err // rethrow so caller knows it failed
  }
}
