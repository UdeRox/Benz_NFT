import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryToasterHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const {
        payload: {
          data: { error },
        },
      } = action
      // if (error) toast.error(JSON.stringify(error))
    } else if (isFulfilled(action)){
      const {payload:{
        message
      }} = action

      // if (message) toast.success(message)
    }
    return next(action)
  }
