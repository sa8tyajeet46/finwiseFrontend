import { defineStore } from 'pinia'

export const useErrorDialogStore = defineStore('error', {
  persist: true,
  state: () => ({
    errorMessage: '',
    visible: false,
    validationErrorMessages: [],
  }),

  actions: {
    setError(errorMessage) {
      this.errorMessage = errorMessage
      this.visible = true
      setTimeout(() => {
        this.resetError()
      }, 2000)
    },
    resetError() {
      this.errorMessage = ''
      this.visible = false
      this.validationErrorMessages = []
    },
    setValidationError(validationErrors) {
      this.validationErrorMessages = validationErrors
    },
  },
})
